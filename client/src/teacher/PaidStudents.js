import React, {useEffect} from 'react'
import TeacherHeader from './TeacherHeader'
import {useSelector, useDispatch} from 'react-redux'
import {paid_students} from '../actions'



const PaidStudents = (props)=>{
    const students = useSelector(state => state.studentsPaidReducer)
    const dispatch = useDispatch()
    const {id} = props.match.params

    useEffect(()=>{
        dispatch(paid_students(id))
    },[dispatch, id])

    const renderStudents = ()=>{
        if(!students){
            return <h1>Loading Students...</h1>
        }
        
        if(students !== null){
            if(students.message){
                return <h1>{students.message}</h1>
            }
        }

        let i = 0
        let j = 1
        return (
            <div>
                <h1>Students that paid for {students.course[0].course_name}, test #{students.course[0].test_number} </h1>
                <table className="ui celled table">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Name</th>
                            <th>Last Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.studentsPaid.map((student)=>{
                            return (
                                <tr key={i++}>
                                    <td data-label="Number">{j++}</td>
                                    <td data-label="Name">{student.name}</td>
                                    <td data-label="Last Name">{student.last_name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
   
    return (
        <div>
            <TeacherHeader/>
            {renderStudents()}
        </div>
    )
}

export default PaidStudents