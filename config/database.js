const Sequelize = require('sequelize')
const keys = require('./keys')
const sequelize = new Sequelize(keys.DB, keys.USER, keys.PASSWORD,{
    host: keys.HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
})

module.exports = sequelize