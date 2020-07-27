import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TeacherHeader from './TeacherHeader'
import {getName} from '../actions'



const Welcome = ()=>{
    const name = useSelector(state=> state.getNameReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getName())
    }, [dispatch])

    const renderName = ()=>{
        if(name === null){
            return <div>Welcome</div>
        }
        if(name !== null){
            if(name.name){
                return <div>Welcome {name.name}</div>
            }
        }
    }
   
    return (
        <div>
            <TeacherHeader/>
            {renderName()}
            
        </div>
    )
}

export default Welcome