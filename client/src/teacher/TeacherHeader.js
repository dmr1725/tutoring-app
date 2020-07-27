import React from 'react'
import {Link} from 'react-router-dom'
import Logout from '../components/Logout'

const TeacherHeader = ()=>{
    return (
        <div className="ui secondary pointing menu">
            <Link to="/teacher/welcome" className="item">
                Welcome
            </Link>
            <Link to="/teacher/courses" className="item">
                Mis cursos
            </Link>
            <Link to="/teacher/todayCourses" className="item">
                Hoy
            </Link>
            <Link to="/teacher/createCourse" className="item">
                Crear Curso
            </Link>
            <Logout/>

        </div>
    )
}

export default TeacherHeader
