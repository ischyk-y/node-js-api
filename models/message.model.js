const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const mStats = require('../models/m_stats.model');
const cStats = require("./c_stats.model");

const Message = sequelize.define('message', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    text: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    media: {
        type: DataTypes.JSON
    },
    entities: {
        type: DataTypes.JSON
    }
    // Add other fields for the Message model if needed
}, {
    modelName: 'message'
});

Message.hasMany(cStats, { foreignKey: 'chat_id' });
Message.hasOne(mStats, { as: 'stats', foreignKey: 'message_id' });

module.exports = Message;
