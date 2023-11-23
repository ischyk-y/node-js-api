const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const cAbout = sequelize.define('c_about', {
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
    about: {
        type: DataTypes.TEXT
    }
}, {
    modelName: 'c_about',
});

module.exports = cAbout;
