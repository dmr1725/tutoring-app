import React, {useEffect} from 'react'
import StudentHeader from './StudentHeader'
import {useSelector, useDispatch} from 'react-redux'
import {getName} from '../actions'

const Hello =()=>{
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
                return <div>Hello {name.name}</div>
            }
        }
    }
    return (
        <div>
            <StudentHeader/>
            {renderName()}
        </div>
    )
}

export default Hello