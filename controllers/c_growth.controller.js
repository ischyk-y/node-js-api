const { Op } = require('sequelize');

const cGrowth = require('../models/c_growth.model');

class GrowthController {
    async getGrowth(params) {
        try {
            const growth = await cGrowth.findAll({
                where: params,
                order: [['id', 'DESC']]
            });

            return { ok: true, rows: growth }
        } catch (err) {
            console.log(err);
            return { ok: false }
        }
    }
}

module.exports = new GrowthController();