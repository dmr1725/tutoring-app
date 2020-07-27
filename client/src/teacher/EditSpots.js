import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import TeacherHeader from './TeacherHeader'
import {edit_spots} from '../actions'

const EditSpots = (props)=>{
    const {id} = props.match.params
    const [spots, setSpots] = useState('')
    const updatedSpot = useSelector(state => state.editSpotsReducer)
    const dispatch = useDispatch()

    function handleChange(e){
        const text = e.target.value
        setSpots(text)
    }

    function onSubmit(e){
        e.preventDefault()
        dispatch(edit_spots(id, spots))
    }

    const redirectTo = ()=>{
        if(updatedSpot !== null){
           
            
            if(updatedSpot[0] === 1){
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
                                Updating Spots
                            </div>
                            <p>Once spots is updated, you will be redirected to your courses</p>
                        </div>
                </div>
            )
        }
    }
    console.log(updatedSpot)
    return (
        <div>
            <TeacherHeader/>
            <form className="ui form" onSubmit={onSubmit}>
                <div className="field">
                    <label>Spots</label>
                    <input type="text" name="spots" value={spots} onChange={handleChange}/>
                </div>
                <button className="ui button" type="submit">Submit</button>
            </form>
            {redirectTo()}
        </div>
    )
}

export default EditSpots