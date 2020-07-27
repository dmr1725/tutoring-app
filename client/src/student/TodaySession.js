import React, {useEffect} from 'react'
import StudentHeader from './StudentHeader'
import {useSelector, useDispatch} from 'react-redux'
import {course_today, check_presence} from '../actions'
import {Link} from 'react-router-dom'



const TodaySession = ()=>{
    const todayCourse = useSelector(state => state.todayStudentReducer)
    const status = useSelector(state => state.checkPresenceReducer)
    const dispatch = useDispatch()
    let id

    if(todayCourse){
        if(todayCourse.courseToday){
            id = todayCourse.courseToday[0].id
            
        }
    }

    useEffect(()=>{
        
        dispatch(course_today())
        dispatch(check_presence(id))
        
        
    }, [dispatch, id])

    const renderCourse = ()=>{
        if(!todayCourse){
            return <h1>Loading course...</h1>
        }

        if(todayCourse){
            if(todayCourse.message){
                return <h1> {todayCourse.message} </h1>
            }
        }

        if(todayCourse.courseToday){
            let i = 0
            return (
                <div>
                    <h1>Class of today </h1>
                    <table className="ui celled table">
                        <thead>
                            <tr>
                                <th>Course Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayCourse.courseToday.map((course)=>{
                                return (
                                    <tr key={i++}>
                                        <td data-label="Course Name">{course.course_name}</td>
                                        <td data-label="Action">
                                            <Link to={`/student/sendCode/${course.id}`} className="ui button primary">
                                                Present
                                            </Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            )

            
        }
    }

    const renderPresence = ()=>{
        return <h1>Your present for today's class</h1>    
    }


    // console.log(todayCourse)
    return (
        <div>
            <StudentHeader/>
            {status && status.status === 'PRESENT' ? renderPresence(): renderCourse()}
        </div>
    )
}

export default TodaySession