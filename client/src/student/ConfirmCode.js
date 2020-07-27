import React, {useState} from 'react'
import StudentHeader from './StudentHeader'
import {confirm_code} from '../actions'
import { useSelector, useDispatch } from 'react-redux'


const ConfirmCode = (props)=>{
    const [code, setCode] = useState('')
    const codeStatus = useSelector(state => state.confirmCodeReducer)
    const dispatch = useDispatch()
    const {id} = props.match.params

    const handleChange = (e)=>{
        const text = e.target.value
        setCode(text)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(confirm_code(id, code))
    }

    const redirectTo = ()=>{
        if(codeStatus){
            if(codeStatus.message === 'Incorrect Code'){
                return <h1> {codeStatus.message} </h1>
            }
        }

        if(codeStatus){
            if(codeStatus.updatePresent[0] === 1){
                const {history} = props
                    setTimeout(function(){
                        console.log(history)
                        return (
                            history.push('/student/myCourses')
                        )
                    }, 3000)
    
                return (
                    <div className="ui icon message">
                        <i className="notched circle loading icon"></i>
                            <div className="content">
                                <div className="header">
                                    Seeing if codes matched
                                </div>
                                <p>Once code matched, you will be redirected to to your courses</p>
                            </div>
                    </div>
                )
            }
        }
    }

    console.log(codeStatus)
    return (
        <div>
            <StudentHeader/>
            <form className="ui form" onSubmit={handleSubmit}>
                <div className="field">
                    <label>We've sent a code to your email. Check it and insert it here</label>
                    <input onChange={handleChange} type="text"/>
                </div>
                <button className="ui button primary">Submit Code</button>
                {redirectTo()}
            </form>
        </div>
    )
}

export default ConfirmCode