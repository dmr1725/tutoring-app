const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("enrolls", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    // user_id y class_id son foreign keys. Eso lo hago en phpMyAdmin
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    course_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
    },
    paid: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})