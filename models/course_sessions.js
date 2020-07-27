const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("course_sessions", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    enrolled_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    hour: {
        type: Sequelize.INTEGER(3),
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'NOT PRESENT'
    },
    order: {
        type: Sequelize.STRING,
        allowNull: false,
    }

})