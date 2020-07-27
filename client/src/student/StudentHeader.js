import React from 'react'
import {Link} from 'react-router-dom'
import Logout from '../components/Logout'

const Student = ()=>{
    return (
        <div className="ui secondary pointing menu">
            <Link to="/student/hello" className="item">
                Hello
            </Link>
            <Link to="/student/coursesToEnroll" className="item">
                Available Courses
            </Link>
            <Link to="/student/myCourses" className="item">
                My Courses
            </Link>
            <Link to="/student/unpaid" className="item">
                Pay Courses
            </Link>
            <Link to="/student/todaySession" className="item">
                Today
            </Link>
            <Logout/>

        </div>
    )
}

export default Student
