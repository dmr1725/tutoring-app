import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TeacherHeader from './TeacherHeader'
import {create_course} from '../actions'

const CreateCourse = (props) =>{
    const [courseName, setCourseName] = useState('')
    const [testNumber, setTestNumber] = useState('')
    const [spots, setSpots] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const createdCourse = useSelector(state => state.createCourseReducer)
    const dispatch = useDispatch()

    function handleCourseChange(e){
        const text = e.target.value
        setCourseName(text)
    }

    function handleTestChange(e){
        const text = e.target.value
        setTestNumber(text)
    }

    function handleSpotsChange(e){
        const text = e.target.value
        setSpots(text)
    }

    function handleStartChange(e){
        const text = e.target.value
        setStartDate(text)
    }

    function handleEndChange(e){
        const text = e.target.value
        setEndDate(text)
    }

    function submitForm(e){
        e.preventDefault()
        dispatch(create_course(courseName, testNumber, spots, startDate, endDate))
    }

    const redirectTo = ()=>{
        if(createdCourse !== null){
           
            
            if(createdCourse.id){
                const {history} = props
                setTimeout(function(){
                    console.log(history)
                    return (
                        history.push('/teacher/courses')
                    )
                }, 3000)
            }

            return (
                <div className="ui icon message">
                    <i className="notched circle loading icon"></i>
                        <div className="content">
                            <div className="header">
                                Creating Course
                            </div>
                            <p>Once course is created, you will be redirected to your courses</p>
                        </div>
                </div>
            )
        }
    }

    
    

    return (
        <div>
            <TeacherHeader/>
            <form className="ui form" onSubmit={submitForm}>
                <div className="field">
                    <label>Course Name</label>
                    <input type="text" name="course-name" value={courseName} onChange={handleCourseChange}/>
                </div>
                <div className="field">
                    <label>Test Number</label>
                    <input type="text" name="test-number" value={testNumber} onChange={handleTestChange}/>
                </div>
                <div className="field">
                    <label>Spots</label>
                    <input type="text" name="spots" value={spots} onChange={handleSpotsChange}/>
                </div>
                <div className="field">
                    <label>Start Date</label>
                    <input type="text" name="start-date" placeholder="2020-05-23" value={startDate} onChange={handleStartChange}/>
                </div>
                <div className="field">
                    <label>End Date</label>
                    <input type="text" placeholder="2020-05-23" name="end-date" value={endDate} onChange={handleEndChange}/>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            {redirectTo()}
        </div>
    )
}

export default CreateCourse