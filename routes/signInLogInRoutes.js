const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const sequelize = require('../config/database')
const User = require('../models/users')
const auth = require('../middleware/auth')
const axios = require('axios')



module.exports = (app)=>{
    /////////////////////////////////////////////////////////////
    app.post('/api/register', async(req, res)=>{
        const email = req.body.email

        if(!validator.isEmail(email)){
            return res.send('Your email is not valid').status(400)
        }

        const findEmail = await User.findOne({
            where: {
                email: email
            }
        })

        if(findEmail){
            return res.send('You have registered with this email').status(400)
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 8)

        const user = await User.create({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        })

        const token = jwt.sign({user}, 'secretkey', {expiresIn: '1m'})

        res.send({
            user,
            token,
            msg: 'Registered successfully'
        })
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/login', async(req, res)=>{
        // unhashed password 
        const unhashedPassword = req.body.password
        console.log(req.body.email)
        // hashed password from the table users
        const user = await User.findOne({
            where: {
                email: req.body.email
            }
        })

        if(!user){
            return res.send({message: 'Unable to log in'}).status(400)
        }


        const isMatch = await bcrypt.compare(unhashedPassword, user.password)

        if(!isMatch){
            return res.send({message: 'Unable to log in'}).status(400)
        }

        
        const token = jwt.sign({user}, 'secretkey', {expiresIn: '3m'})

        // const decodedToken = jwt.verify(token, 'secretkey')

        res.send({
            user: user,
            // name: user.name,
            token: token,
            // decodedToken: decodedToken,
            message: 'logged in'
        })
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/getRole', auth, async(req, res)=>{
        const role = await User.findOne({
            attributes: ['role'],
            where:{
                id: req.decodedToken.id
            }
        })

        res.send(role)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/getName', auth, async(req, res)=>{
        const name = await User.findOne({
            attributes: ['name'],
            where: {
                id: req.decodedToken.id
            }
        })

        res.send(name)
    })

    

    

}