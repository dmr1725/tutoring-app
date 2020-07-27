const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const moment = require('moment')
require('./emails/emails')


const app = express()

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
 


app.get('/', (req,res)=>{
    res.send({message: 'hola'})
})

require('./routes/signInLogInRoutes')(app)
require('./routes/teacherRoutes')(app)
require('./routes/studentRoutes')(app)


app.listen(5000, ()=>{
    console.log('running the server on port 5000')
})
