const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Message = require('../models/message.model');

const mStats = sequelize.define('m_stats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    views: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    modelName: 'm_stats',
});



module.exports = mStats;
