const Sequelize = require('sequelize')
const sequelize = require('../config/database')


module.exports = sequelize.define("users", {
    id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    role: {
        type: Sequelize.STRING,
        defaultValue: 'student'
    },
    code: {
        type: Sequelize.STRING(20),
        defaultValue: ''
    }

})

// crear tabla
// User.sync().then(()=>{
//     console.log('table created')
// })