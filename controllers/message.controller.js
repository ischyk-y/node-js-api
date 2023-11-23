const Message = require('../models/message.model');
const Chat = require('../models/chat.model');
const mStats = require('../models/m_stats.model');
const sequelize = require("../config/db.config");


class MessageController {
    async getMessage(id, chat_id) {
        try {
            const message = await Message.findOne({
                include: [
                    {
                        model: Chat,
                        attributes: ['id', 'title', 'peer'],
                    },
                    {
                        on: sequelize.literal('"message"."id" = "stats"."message_id" AND "message"."chat_id" = "stats"."chat_id"'),
                        model: mStats,
                        as: 'stats',
                        attributes: ['views']
                    }
                ],
                where: { id: id, chat_id: chat_id }
            });

            if (message.stats) {
                const views = message.stats.views;

                const result = {};

                for (let key in views) {
                    const previousKey = key - 1;
                    if (previousKey > 0) {
                        result[key] = [views[key], views[key] - views[previousKey]];
                    } else {
                        result[key] = [views[key], views[key]];
                    }
                }
                message['stats']['views'] = result
            }

            return { ok: true, result: message }
        } catch (err) {
            console.error(err);
            return { ok: false }
        }
    }

    async getMessages() {
        try {
            const messages = await Message.findAll({
                include: [
                    {
                        model: Chat,
                        attributes: ['id', 'title', 'peer'],
                    }
                ],
                order: [
                    ['id', 'DESC']
                ],
                limit: 20
            });

            return {ok: true, rows: messages}
        } catch (err) {
            return String(err);
        }
    }
}

module.exports = new MessageController();