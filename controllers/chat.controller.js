const { Op } = require('sequelize');

const Chat = require('../models/chat.model');
const cStats = require('../models/c_stats.model');
const cAbout = require('../models/c_about.model');

class ChatController {
    async getChat(peer) {
        try {
            const chat = await Chat.findOne({
                where: {
                    peer: peer,
                    tg_id: {
                        [Op.not]: null
                    }
                },
                include: [
                    {
                        model: cStats,
                        as: 'stats',
                        attributes: ['date', 'views'],
                        required: false,
                        order: [['date', 'DESC']],
                        limit: 3
                    },
                    {
                        model: cAbout,
                        as: 'about',
                        attributes: ['date', 'about'],
                        required: false,
                        order: [['date', 'DESC']],
                        limit: 1
                    }
                ],
            });

            return { ok: true, result: chat }
        } catch (err) {
            console.log(err);
            return { ok: false }
        }
    }

    async getChats(query) {
        try {
            const where = {};

            if (query.title) {
                where['title'] = { [Op.iLike]: `%${query.title}%` };
            }
            where['tg_id'] = { [Op.not]: null };

            const chats = await Chat.findAll({
                where: where,
                include: [
                    {
                        model: cStats,
                        as: 'stats',
                        attributes: ['date', 'views'],
                        required: false,
                        order: [['date', 'DESC']],
                        limit: 3
                    }
                ],
                order: [['id', 'DESC']]
            });

            return { ok: true, rows: chats }
        } catch (err) {
            console.log(err);
            return { ok: false }
        }
    }
}

module.exports = new ChatController();