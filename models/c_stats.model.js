const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const cStats = sequelize.define('c_stats', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    chat_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    modelName: 'c_stats',
});

module.exports = cStats;
