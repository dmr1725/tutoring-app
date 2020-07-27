import React, {useEffect} from 'react'
import StudentHeader from './StudentHeader'
import {my_courses} from '../actions'
import {useSelector, useDispatch} from 'react-redux'


const MyCourses = ()=>{
    const myCourses = useSelector(state => state.myCoursesReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(my_courses())
    }, [dispatch])

    const renderCourses = ()=>{
        if(!myCourses){
            return <h1>Loading courses...</h1>
        }

        if(myCourses){
            if(myCourses.message){
                return <h1> {myCourses.message} </h1>
            }
        }
        let i = 0
        return (
            <div>
                <h1>My Courses</h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myCourses.coursesEnrolled.map((course)=>{
                            return (
                                <tr key={i++}>
                                    <td data-label="Course Name">{course.course_name}</td>
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
            <StudentHeader/>
            {renderCourses()}
        </div>

    )
}

export default MyCourses