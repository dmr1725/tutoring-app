import React, {useState} from 'react'
import TeacherHeader from './TeacherHeader'
import {send_email_toStudents} from '../actions'
import {useSelector, useDispatch} from 'react-redux'

const SendEmail = (props)=>{
    const [text, setText] = useState('')
    const emails = useSelector(state => state.sendEmailReducer)
    const dispatch = useDispatch()

    function handleChange(e){
        const bodyEmail = e.target.value
        setText(bodyEmail)
    }

    function handleSubmit(e){
        e.preventDefault()
        const {id} = props.match.params
        dispatch(send_email_toStudents(id, text))
    }

    const redirectTo = ()=>{
        if(emails !== null){
            if(emails.message){
                return <h1>No students yet</h1>
            }
            
            if(emails.length > 0){
                const {history} = props
                setTimeout(function(){
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
                                Sending Emails
                            </div>
                            <p>Once emails are sent, you will be redirected to your courses</p>
                        </div>
                </div>
            )
        }
    }

    console.log(emails) 

 
    return (
        <div>
            <TeacherHeader/>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>Text</label>
                    <textarea value={text} onChange={handleChange}></textarea>
                </div>
                <button className="ui button primary">Send</button>
            </form>
            {redirectTo()}
        </div>
    )
}

export default SendEmail