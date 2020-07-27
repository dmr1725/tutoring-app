require('dotenv').config()
const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)




const sendEmailToClass = (emails, message)=>{
    sgMail.send({
        to: emails,
        from: 'diegozmendez@gmail.com',
        subject: 'Prueba',
        text: message
    }).catch((e)=>{
        console.log(e)
        console.log('hola')
    })
}

const sendCode = (email, code)=>{
    sgMail.send({
        to: email,
        from: 'diegozmendez@gmail.com',
        subject: 'Code for being present in class',
        text: code
    }).catch((e)=>{
        console.log(e)
        console.log('hola')
    })
}

module.exports = {
    sendEmailToClass,
    sendCode
}