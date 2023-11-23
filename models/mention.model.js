const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const Message = require('./message.model');

const Mention = sequelize.define('mention', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    message_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    message_chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cost: {
        type: DataTypes.FLOAT
    },
    requested: {
        type: DataTypes.INTEGER
    },
    cpa: {
        type: DataTypes.FLOAT
    }
}, {
    modelName: 'mention'
});

Message.hasMany(Mention, { foreignKey: 'message_id' });
Mention.belongsTo(Message, { foreignKey: 'message_id' });

module.exports = Mention;
