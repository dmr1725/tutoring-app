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

if(process.env.NODE_ENV === "production"){
    // Express will serve up production assets
    // like our main.js file, or main.css file
    app.use(express.static("client/build"))

    // Express will serve up the index.html file 
    // if it does not recognize a particular route
    const path = require("path")
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{
    console.log(`running the server on port ${PORT}`)
})

