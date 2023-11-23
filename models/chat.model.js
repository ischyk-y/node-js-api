const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Message = require('../models/message.model');
const Mention = require('../models/mention.model');
const cStats = require('../models/c_stats.model');
const cAbout = require('../models/c_about.model');

const Chat = sequelize.define('chat', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tg_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    peer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING
    },
    participants_count: {
        type: DataTypes.INTEGER
    }
// Додайте інші поля для моделі Chat за потребою
}, {
    modelName: 'chat',
});

Mention.belongsTo(Chat, { foreignKey: 'message_chat_id' });
Message.belongsTo(Chat, { foreignKey: 'chat_id' });
Chat.hasMany(cStats, { as: 'stats', foreignKey: 'chat_id' });
Chat.hasMany(cAbout, { as: 'about', foreignKey: 'chat_id' });

module.exports = Chat;
