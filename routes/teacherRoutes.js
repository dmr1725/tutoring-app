const sequelize = require('../config/database')
const auth = require('../middleware/auth')
const isTeacher = require('../middleware/isTeacher')
const Course = require('../models/courses')
const Enroll = require('../models/enrolls')
const {getToday} = require('../time/datesAndHours')
const {sendEmailToClass} = require('../emails/emails')

module.exports = (app)=>{
     /////////////////////////////////////////////////////////////
     app.get('/api/user/teacher', auth, isTeacher, async(req, res)=>{
        res.send({
            user: req.decodedToken
        })
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/teacher/createCourse', auth, isTeacher, async(req, res)=>{
        const course = await Course.create({
            course_name: req.body.course_name,
            test_number: req.body.test_number,
            spots: req.body.spots,
            start_date: req.body.start_date,
            end_date: req.body.end_date
        })

        res.send({
            id: course.id,
            start_date: course.start_date,
            end_date: course.end_date
        })
    }) 

    /////////////////////////////////////////////////////////////
    app.post('/api/user/teacher/sendEmailToStudents', auth, isTeacher, async(req, res)=>{
        console.log(req.body)
        console.log(req.body.course_id)
        console.log(req.body.message)
        const emails = await sequelize.query(
            `SELECT email from users u where u.id in (select user_id from enrolls e where e.course_id = '${req.body.course_id}') `,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(emails.length === 0){
            return res.send({
                message: 'No emails found'
            })
        }

        let emailsArr = []
        for(let i = 0; i < emails.length; i++){
            emailsArr.push(emails[i].email)
        }
        console.log(emailsArr)

        sendEmailToClass(emailsArr, req.body.message)

       

        res.send(emails)
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/teacher/teachingToday', auth, isTeacher, async(req, res)=>{
        const today = getToday()
        const classesForToday = await sequelize.query(
            `
            select c.course_name, c.id from courses c where c.id in (
                select e.course_id from enrolls e where e.id in (
                    select enrolled_id from course_sessions where date = '${today}'))
            `,
            {type: sequelize.QueryTypes.SELECT}
        )


        if(classesForToday.length === 0){
            return res.send({
                message: 'Hoy no tienes clases'
            })
        }

        res.send(
            classesForToday
        )
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/teacher/studentsNotPresent', auth, isTeacher, async(req, res)=>{
        const today = getToday()
        const notPresent = await sequelize.query(
            `
            select u.name, u.last_name from users u where u.id in 
                (select e.user_id from enrolls e where e.course_id = ${req.body.course_id} and e.id in 
                (select enrolled_id from course_sessions where date = '${today}' and status = 'NOT PRESENT'))
            `,
            {type: sequelize.QueryTypes.SELECT}
        )

        if(notPresent.length === 0){
            return res.send({
                message: 'Todos estan presentes'
            })
        }

        const course = await sequelize.query(
            `
            select course_name from courses where id = ${req.body.course_id}
            `, {type: sequelize.QueryTypes.SELECT}
        )

        res.send({notPresent, course}).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/teacher/studentsPresent', auth, isTeacher, async(req, res)=>{
        const today = getToday()
        const present = await sequelize.query(
            `
                select u.name, u.last_name from users u where u.id in 
                    (select e.user_id from enrolls e where e.course_id = ${req.body.course_id} and e.id in 
                    (select enrolled_id from course_sessions where date = '${today}' and status = 'PRESENT'))

            `,
           
            {type: sequelize.QueryTypes.SELECT}
        )

        if(present.length === 0){
            return res.send({
                message: 'Nadie esta presente'
            })
        }

        const course = await sequelize.query(
            `
            select course_name from courses where id = ${req.body.course_id}
            `, {type: sequelize.QueryTypes.SELECT}
        )

        

        res.send({present, course}).status(200)
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/teacher/studentsPaid', auth, isTeacher, async(req, res)=>{
        const studentsPaid = await sequelize.query(
            `
            select name, last_name from users where id in (select user_id from enrolls where course_id = ${req.body.course_id} and paid = 1)

            `, {type: sequelize.QueryTypes.SELECT}
        )

        const course = await sequelize.query(
            `
            select course_name, test_number from courses where id = ${req.body.course_id}
            `, {type: sequelize.QueryTypes.SELECT}
        )

        if(studentsPaid.length === 0){
            return res.send({
                message: 'Ningun estudiante ha pagado'
            })
        }

        res.send({
            studentsPaid,
            course
        })
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/teacher/studentsNotPaid', auth, isTeacher, async(req, res)=>{
        const studentsNotPaid = await sequelize.query(
            `
            select name, last_name from users where id in (select user_id from enrolls where course_id = ${req.body.course_id} and paid = 0)

            `, {type: sequelize.QueryTypes.SELECT}
        )

        if(studentsNotPaid.length === 0){
            return res.send({
                message: 'Todos los estudiante pagaron'
            })
        }

        const course = await sequelize.query(
            `
            select course_name, test_number from courses where id = ${req.body.course_id}
            `, {type: sequelize.QueryTypes.SELECT}
        )

        res.send({studentsNotPaid, course})
    })

    /////////////////////////////////////////////////////////////
    app.post('/api/user/teacher/classStats', auth, isTeacher, async(req, res)=>{
        const today = getToday()
        const stats = await sequelize.query(
            `
            select distinct u.id, u.name, u.last_name, c.course_name, e.paid, cs.status from course_sessions cs 
                inner join enrolls e on e.id = cs.enrolled_id 
                inner join users u on u.id = e.user_id 
                inner join courses c on c.id = e.course_id and c.id = ${req.body.course_id}
                where cs.date = '${today}'

            `, {type: sequelize.QueryTypes.SELECT}
        )

        if(stats.length === 0){
            return res.send({
                message: 'No hay lista de estudiantes'
            })
        }

        const course = await sequelize.query(
            `
            select course_name from courses where id = ${req.body.course_id}
            `, {type: sequelize.QueryTypes.SELECT}
        )

        res.send({stats, course})
    })

    /////////////////////////////////////////////////////////////
    app.get('/api/user/teacher/myCourses', auth, isTeacher, async(req, res)=>{
        const today = getToday()
        const courses = await sequelize.query(
            `
            select id, course_name, test_number, start_date, end_date, spots from courses where end_date >= '${today}'
            `, {type: sequelize.QueryTypes.SELECT}
        )

        if(courses.length === 0){
            return res.send({message: 'No courses found'})
        }

        for(let i = 0; i < courses.length; i++){
            const studentsEnrolledInOneClass = await Enroll.findAll({
                where: {
                    course_id: courses[i].id
                }
            })

            console.log(studentsEnrolledInOneClass.length)

            courses[i].studentCount = studentsEnrolledInOneClass.length
            
        } 

        

        res.send(courses)
    })

    /////////////////////////////////////////////////////////////
    app.patch('/api/user/teacher/updateSpots', auth, isTeacher, async(req, res)=>{
        console.log(req.body.id)
        
        const updatedSpots = await Course.update(
            {spots: req.body.spots},
            {where: {
                id: req.body.id
            }}
        )


       


        res.send(updatedSpots)

    })

    


    
    
}
