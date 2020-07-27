const Sequelize = require('sequelize')
const sequelize = require('../config/database')

module.exports = sequelize.define("courses", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    course_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    test_number: {
        type: Sequelize.INTEGER(3),
        allowNull: false

    },
    spots: {
        type: Sequelize.INTEGER(11),
        allowNull: false
    },
    start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    }
    // ,
    // hour: {
    //     type: Sequelize.INTEGER(3),
    //     allowNull: false
    // }

})