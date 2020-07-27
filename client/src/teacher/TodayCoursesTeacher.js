import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TeacherHeader from './TeacherHeader'
import {teacher_course_today} from '../actions'
import {Link} from 'react-router-dom'


const TodayCoursesTeacher = ()=>{
    const course = useSelector(state => state.teachingTodayReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(teacher_course_today())
    }, [dispatch])

    const renderCourse = ()=>{
        if(!course){
            return <h1>Loading courses for today...</h1>
        }

        if(course){
            if(course.message){
                return <h1>{course.message}</h1>
            }
        }

        return (
            <div>
                <h1>Course for today</h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Present</th>
                            <th>Not Present</th>
                            <th>All Stats</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {course.map((course)=>{
                            return (
                                <tr key={course.id}>
                                    <td data-label="Name">{course.course_name}</td>
                                    <td data-label="Present">
                                        <Link to={`/teacher/studentsPresent/${course.id}`} className="ui button primary">
                                            Present
                                        </Link>
                                    </td>
                                    <td data-label="Not-Present">
                                        <Link to={`/teacher/studentsNotPresent/${course.id}`} className="ui button primary">
                                            Not Present
                                        </Link>
                                    </td>
                                    <td data-label="All-Stats">
                                        <Link to={`/teacher/allStudentStats/${course.id}`} className="ui button primary">
                                            Lista
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
    console.log(course)
    return (
        <div>
             <TeacherHeader/>
             {renderCourse()}
        </div>
    )
}


export default TodayCoursesTeacher