import React, {useEffect} from 'react'
import StudentHeader from './StudentHeader'
import {not_paid_courses} from '../actions'
import {useSelector, useDispatch} from 'react-redux'



const UnpaidCourses = (props)=>{
    const unpaid = useSelector(state => state.unPaidCourseReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(not_paid_courses())
    }, [dispatch])

    const renderCourses = ()=>{
        if(!unpaid){
            return <h1>Loading courses...</h1>
        }

        if(unpaid){
            if(unpaid.message){
                return <h1> {unpaid.message} </h1>
            }
        }
        let i = 0
        return (
            <div>
                <h1>Pay Courses</h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {unpaid.courses.map((course)=>{
                            return (
                                <tr key={i++}>
                                    <td data-label="Course Name">{course.course_name}</td>
                                    <td data-label="Action">
                                        <button className="ui button green"
                                            onClick = {()=>{
                                                const {history} = props
                                                history.push(`/student/checkout/${course.id}`)
                                            }}
                                        >
                                            Pay
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }

    console.log(unpaid)

    return (
        <div>
            <StudentHeader/>
            {renderCourses()}
        </div>

    )
}

export default UnpaidCourses