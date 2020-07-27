import React from 'react'
import StudentHeader from './StudentHeader'
import {update_code} from '../actions'
import { useSelector, useDispatch } from 'react-redux'

const UpdateCode = (props)=>{
    const codeStatus = useSelector(state => state.updateCodeReducer)
    const dispatch = useDispatch()

    // console.log(codeStatus)

    const redirectTo = ()=>{
        if(codeStatus){
            if(codeStatus.updatedCode[0] === 1){
                const {history} = props
                history.push(`/student/confirmCode/${props.match.params.id}`)
            }
        }
    }

    return (
        <div>
            <StudentHeader/>
            <div className="ui message">
                <div className="header">
                    We will send you a code to your email when you 'click' button
                </div>
            </div>
            <button className="ui primary button"
                onClick={()=>{
                    dispatch(update_code())
                }}
            >
                Send code
            </button>
            {redirectTo()}
        </div>
    )
}

export default UpdateCode