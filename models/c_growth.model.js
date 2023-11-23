const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const cGrowth = sequelize.define('c_growth', {
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
    participants_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    modelName: 'c_growth',
});

module.exports = cGrowth;
