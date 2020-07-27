import React, { useEffect } from 'react'
import StudentHeader from './StudentHeader'
import {useSelector, useDispatch} from 'react-redux'
import {courses_to_enroll, enroll} from '../actions'


const CoursesToEnroll = (props)=>{

    const courses = useSelector(state=>state.coursesToEnrollReducer)
    const enroll_value = useSelector(state=>state.enrollReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(courses_to_enroll())
    }, [dispatch])

    const redirectTo = ()=>{
        if(enroll_value){
            if(enroll_value.message){
                return 
            }
        }

        if(enroll_value!== null){
           
            
            if(enroll_value.enroll){
                const {history} = props
                setTimeout(function(){
                    console.log(history)
                    return (
                        history.push('/student/myCourses')
                    )
                }, 3000)
            }

            return (
                <div className="ui icon message">
                    <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Te estamos matriculando
                            </div>
                            <p>Una vez, estes matriculado, te mandaremos a tus cursos</p>
                        </div>
                </div>
            )
        }
    }

    const renderStatus = ()=>{
        if(!enroll_value){
            return 'Matricular'
        }

        if(enroll_value.message){
            return enroll_value.message
        }
    }



    const renderCourses = ()=>{
        if(!courses){
            return <h1>Loading courses...</h1>
        }

        if(courses){
            if(courses.message){
                return <h1> {courses.message} </h1>
            }
        }
        let i = 0
        return (
            <div>
                <h1>Courses to enroll </h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Course Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Spots Left</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.courses.map((course)=>{
                            return (
                                <tr key={i++}>
                                    <td data-label="Course Name">{course.course_name}</td>
                                    <td data-label="Start Date">{course.start_date}</td>
                                    <td data-label="End Date">{course.end_date}</td>
                                    <td data-label="Spots Left">{course.spotsLeft}</td>
                                    <td data-label="Action">
                                        <button key={course.id} className="ui button primary"
                                            onClick={()=>{
                                                dispatch(enroll(course.id))
                                            }}
                                        >
                                           {renderStatus()}
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

    // console.log(courses)


    return (
        <div>
            <StudentHeader/>
            {redirectTo()}
            {renderCourses()}
        </div>
    )
}

export default CoursesToEnroll