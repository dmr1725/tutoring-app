import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {findTeacherCourses} from '../actions'
import {Link} from 'react-router-dom'
import TeacherHeader from './TeacherHeader'


const CoursesTeaching = ()=>{
    const myCourses = useSelector(state => state.teacherCoursesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(findTeacherCourses())
    }, [dispatch])

    const renderCourses = ()=>{
        if(!myCourses){
            return <div>Loading Courses...</div>
        }

        if(myCourses){
            if(myCourses.message){
                return <h1> {myCourses.message} </h1>
            }
        }

        return (
            <div>
                <h1>My Courses</h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Test Number</th>
                            <th>Number of Spots</th>
                            <th>Students Enrolled</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Send Email</th>
                            <th>Paid</th>
                            <th>Not Paid</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCourses.map((course)=>{
                            return (
                                <tr key={course.id}>
                                    <td data-label="Course-Name">{course.course_name}</td>
                                    <td data-label="Test-Number">#{course.test_number}</td>
                                    <td data-label="Number-Of-Spots">#{course.spots}</td>
                                    <td data-label="Qty-Student">{course.studentCount}</td>
                                    <td data-label="Start-Date">{course.start_date}</td>
                                    <td data-label="End-Date">{course.end_date}</td>
                                    <td data-label="Send-Email">
                                        <Link to={`/teacher/sendEmail/${course.id}`} className="ui button primary">
                                            Create Email
                                        </Link>
                                    </td>
                                    <td data-label="Send-Email">
                                        <Link to={`/teacher/paidStudents/${course.id}`} className="ui button primary">
                                            Paid
                                        </Link>
                                    </td>
                                    <td data-label="Send-Email">
                                        <Link to={`/teacher/notPaidStudents/${course.id}`} className="ui button primary">
                                            Not Paid
                                        </Link>
                                    </td>
                                    <td data-label="Edit-Spots">
                                        <Link to={`/teacher/editSpots/${course.id}`} className="ui button primary">
                                            Edit Spots
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

    // console.log(myCourses)
    return (
        <div>
            <TeacherHeader/>
            {renderCourses()}
        </div>
    )
}

export default CoursesTeaching