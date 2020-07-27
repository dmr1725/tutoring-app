require('dotenv').config()
const auth = require('../middleware/auth')
const isStudent = require('../middleware/isStudent')
const Course = require('../models/courses')
const Course_sessions = require('../models/course_sessions')
const Enroll = require('../models/enrolls')
const {createDates, generateHours, getToday} = require('../time/datesAndHours')
const sequelize = require('../config/database')
const Sequelize = require('sequelize')
const User = require('../models/users')
const {sendCode} = require('../emails/emails')
const cryptoRandomString = require('crypto-random-string')
const Enrolls = require('../models/enrolls')

module.exports = (app)=>{
    /////////////////////////////////////////////////////////////
    app.get('/api/user/student', auth, isStudent, async(req, res)=>{
        res.send({
            user: req.decodedToken
        })
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/student/findCoursesNotTaught', auth, isStudent, async(req, res)=>{
        const today = getToday()

        // select distinct c.id, c.course_name, c.start_date, c.end_date from courses c, users u where c.start_date > '2020-07-26' and u.id not in (select user_id from enrolls where user_id = 2)

        // courses that you can enroll to
        const courses = await sequelize.query(
            `select id, course_name, start_date, end_date from courses c where c.start_date > '${today}'`,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(courses.length === 0){
            return res.send({
                message: "No courses found"
            })
        }

        // ver cuantos spots quedan para matricularse
        for(let i = 0; i < courses.length; i++){
            const findSpots = await Course.findOne({
                attributes: ['spots'],
                where: {
                    id: courses[i].id
                }
            })

            const spotsTaken = await Enroll.findAll({
                where: {
                    course_id: courses[i].id
                }
            })

            // console.log('spots', findSpots.dataValues.spots)
            // console.log('spots taken', spotsTaken.length)

            let availableSpot = findSpots.dataValues.spots - spotsTaken.length
           

            courses[i].spotsLeft = availableSpot
        }
        
        res.send({
            courses
        })
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/student/coursesEnrolled', auth, isStudent, async(req, res)=>{
        const today = getToday()
        const coursesEnrolled = await sequelize.query(
            `select course_name from courses c where c.end_date > '${today}' and c.id in (select course_id from enrolls e where e.user_id = ${req.decodedToken.id})`,
            {type: Sequelize.QueryTypes.SELECT}
        )

        console.log(coursesEnrolled)

        if(!coursesEnrolled){
            return res.send({
                message: 'You are not enrolled in any course'
            })
        }

        res.send(
            {
                coursesEnrolled
            }
        )
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/student/courseToday', auth, isStudent, async(req, res)=>{
        const today = getToday()

        const courseToday = await sequelize.query(
            `
            select id, course_name from courses c where c.id in 
                (select course_id from enrolls where user_id = ${req.decodedToken.id} and id in 
                (select enrolled_id from course_sessions where date = '${today}')) `,
                {type: sequelize.QueryTypes.SELECT}
        )

        if(courseToday.length === 0){
            return res.send({
                message: "You don't have a class for today"
            })
        }

        res.send({
            courseToday
        })
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/student/enroll', auth, isStudent, async(req, res)=>{

        const checkEnrollment = await Enroll.findOne({
            where: {
                user_id: req.decodedToken.id,
                course_id: req.body.course_id
            }
        })

        if(checkEnrollment){
            return res.send({
                message: 'You are already enrolled in this class'
            })
        }

        
        const enrollmentCount = await Enroll.findAll({
            where: {
                course_id: req.body.course_id
            }
        })

        const totalSpots = await Course.findOne({
            attributes: ['spots'],
            where: {
                id: req.body.course_id
            }
        })

        const availableSpots =  totalSpots.spots - enrollmentCount.length 
        
        if(availableSpots === 0){
            return res.send({
                message: "Class is full. You can't enroll for the moment"
            })
        }

        // si no esta matriculado, pues se matricula
        const enroll = await Enroll.create({
            user_id: req.decodedToken.id,
            course_id: req.body.course_id
        })

        const course = await Course.findOne({
            attributes: ['start_date', 'end_date'],
            where: {
                id: req.body.course_id
            }
        })

        if(course.length === 0){
            return res.send({message: 'course not found'}).status(401)
        }


        console.log(enroll.dataValues.id)
        console.log(course.dataValues.start_date)
        console.log(course.dataValues.end_date)
        


        // create the four sessions
        const dates = createDates(course.dataValues.start_date, course.dataValues.end_date)
        const hours = generateHours(dates)
        const order = ['first', 'second', 'third', 'fourth']

        for(let i = 0; i < dates.length; i++){
            await Course_sessions.create({
                enrolled_id: enroll.dataValues.id,
                date: dates[i],
                hour: hours[i],
                order: order[i]

            })
        }
        /////////////////////////////

        res.send({enroll})



    })

    /////////////////////////////////////////////////////////////
    app.patch('/api/user/student/updateCode', auth, isStudent, async(req, res)=>{
        const findEmail = await User.findOne({
            attributes: ['email'],
            where: {
                id: req.decodedToken.id
            }
        })
        
        // console.log(email.dataValues.email)
        if(findEmail.length === 0){
            return res.send({
                message: 'email not found'
            })
        }

        let email = findEmail.dataValues.email

        const code = cryptoRandomString({length: 6, type: 'base64'});

        sendCode(email, code)

        const updatedCode = await User.update(
            {code: code},
            {where: {
                id: req.decodedToken.id
            }}
        )

        res.send({
            findEmail,
            updatedCode,
            code
        })
    })

    /////////////////////////////////////////////////////////////
    app.patch('/api/user/student/checkCodeUpdatePresent', auth, isStudent, async(req, res)=>{
        console.log(req.body.code)
        console.log(req.body.course_id)
        const today = getToday()
        const codeFromDB = await User.findOne({
            attributes: ['code'],
            where: {
                id: req.decodedToken.id
            }
        })

        if(codeFromDB.dataValues.code !== req.body.code){
            return res.send({
                message: 'Incorrect Code'
            })
        }

        console.log('hola')

        const enroll = await Enroll.findOne({
            attributes: ['id'],
            where: {
                course_id: req.body.course_id, 
                user_id: req.decodedToken.id
            }
        })

        const enroll_id = enroll.dataValues.id

        const updatePresent = await Course_sessions.update(
            {status: 'PRESENT'}, 
            {
                where: {
                    enrolled_id: enroll_id,
                    date: today
                }
            }
        )

        res.send({
            codeFromDB,
            message: 'Codes match',
            updatePresent
        })
    })

    /////////////////////////////////////////////////////////////
    app.patch('/api/user/student/paidCourse', auth, isStudent, async(req, res)=>{
        const paidCourse = await Enrolls.update(
            {paid: true},
            {where: {
                user_id: req.decodedToken.id,
                course_id: req.body.course_id
            }}
        )


        res.send({
            paidCourse
        })

        
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/student/coursesNotPaid', auth, isStudent, async(req, res)=>{
        const courses = await sequelize.query(
            `
            select id, course_name from courses where id in (select course_id from enrolls where user_id = ${req.decodedToken.id} and paid = 0)

            `, {type: sequelize.QueryTypes.SELECT}
        ) 

        if(courses.length === 0){
            return res.send({
                message: 'No payment for the moment'
            })
        }

        res.send({courses})
    })

    ////////////////////////////////////////////////////////////
    app.post('/api/user/student/checkPresent', auth, isStudent, async(req, res)=>{
        const today = getToday()

        const enroll = await Enroll.findOne({
            attributes: ['id'],
            where: {
                course_id: req.body.course_id, 
                user_id: req.decodedToken.id
            }
        })

        if(enroll.length === 0){
            res.send({message: 'No course found'})
        }

        const enroll_id  = enroll.dataValues.id

        const checkPresence = await Course_sessions.findOne({
            attributes: ['status'],
            where: {
                enrolled_id: enroll_id,
                date: today
            }
        })

        if(checkPresence.length === 0){
            res.send({message: 'No course found'})
        }

        console.log(today)


        res.send(checkPresence)
    })

    







   
}