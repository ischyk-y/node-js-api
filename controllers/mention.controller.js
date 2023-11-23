const { Op } = require('sequelize');
const sequelize = require('../config/db.config');

const Chat = require('../models/chat.model');
const Mention = require('../models/mention.model');
const Message = require('../models/message.model');


class MentionController {
    async getMentionsAggregation(params) {
        try {
            let getParams = Object.keys(params);

            const where = {};
            getParams.includes('chat_id') ? where['chat_id'] = params.chat_id : null;
            getParams.includes('message_chat_id') ? where['message_chat_id'] = params.message_chat_id : null;

            const totalCount = await Message.count({
                include: [
                    {
                        model: Mention,
                        required: true,
                        on: sequelize.literal('"message"."id" = "mentions"."message_id" AND "message"."chat_id" = "mentions"."message_chat_id"'),
                        include: [
                            {
                                model: Chat,
                                attributes: []
                            },
                        ],
                        attributes: [],
                        where: where
                    },
                ],
            });

            const totalViews = await Message.sum('views', {
                include: [
                    {
                        model: Mention,
                        required: true,
                        on: sequelize.literal('"message"."id" = "mentions"."message_id" AND "message"."chat_id" = "mentions"."message_chat_id"'),
                        include: [
                            {
                                model: Chat,
                                attributes: []
                            },
                        ],
                        attributes: [],
                        where: where
                    },
                ]
            });

            const totalCost = await Message.sum('mentions.cost', {
                include: [
                    {
                        model: Mention,
                        required: true,
                        on: sequelize.literal('"message"."id" = "mentions"."message_id" AND "message"."chat_id" = "mentions"."message_chat_id"'),
                        include: [
                            {
                                model: Chat,
                                attributes: []
                            },
                        ],
                        attributes: [],
                        where: where
                    },
                ]
            });

            return {count: totalCount, views: totalViews, cost: totalCost}
        } catch (err) {
            console.log(err)
        }
    }

    async updateMentionValue(id, body) {
        try {
            const [, updatedRows] = await Mention.update(
                body,
                {
                    where: { id: id },
                    returning: true
                },
            );
            return { ok: true, result: updatedRows[0] };
        } catch (err) {
            console.error(err)
        }
    }

    async getMentions(params) {
        try {
            let getParams = Object.keys(params);

            const where = {};
            getParams.includes('chat_id') ? where['chat_id'] = params.chat_id : null;
            getParams.includes('message_chat_id') ? where['message_chat_id'] = params.message_chat_id : null;

            const rows = await Message.findAll({
                attributes: [
                    'id',
                    'date',
                    'text',
                    'media',
                    'views',
                    [sequelize.fn('COUNT', sequelize.col('mentions.id')), 'mention_count']
                ],
                include: [
                    {
                        model: Mention,
                        on: sequelize.literal('"message"."id" = "mentions"."message_id" AND "message"."chat_id" = "mentions"."message_chat_id"'),
                        required: true,
                        include: [
                            {
                                model: Chat,
                                attributes: ['id', 'peer', 'tg_id', 'title']
                            },
                        ],
                        attributes: ['id', 'message_chat_id', 'cost', 'requested', 'cpa'],
                        where: where
                    },
                ],
                group: [
                    'mentions.id',
                    'mentions.message_chat_id',
                    'mentions.cost',
                    'mentions.requested',
                    'mentions.cpa',
                    'message.id',
                    'message.date',
                    'message.text',
                    'message.media',
                    'message.views',
                    'mentions.chat.id',
                    'mentions.chat.title'
                ],
            });

            const formattedRows = rows.map(row => {
                return {
                    id: row.mentions[0].id,
                    message: {
                        id: row.id,
                        date: row.date,
                        text: row.text,
                        media: row.media,
                        views: row.dataValues.views
                    },
                    mention_count: row.mentions.length,
                    chat: {
                        id: row['mentions'][0]['chat'].id,
                        tg_id: row['mentions'][0]['chat'].tg_id,
                        peer: row['mentions'][0]['chat'].peer,
                        title: row['mentions'][0]['chat'].title
                    },
                    cost: row['mentions'][0]['cost'],
                    requested: row['mentions'][0]['requested'],
                    cpa: row['mentions'][0]['cpa']
                };
            });

            return { ok: true, rows: formattedRows }
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = new MentionController();