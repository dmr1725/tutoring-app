import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import StudentHeader from './StudentHeader'
import {pay_course} from '../actions'


const Checkout = (props)=>{

    const {id} = props.match.params
    const [render, setRender] = useState(false)
    const paid = useSelector(state => state.payCourseReducer)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(sessionStorage.getItem('response')){
            console.log('hola')
            sessionStorage.removeItem('response')
            setRender(true)
        }
    }, [render])

    const renderFinishButton = ()=>{
        if(render){
            return (
                <button className="ui button primary" onClick={()=>dispatch(pay_course(id))}>Dale click para terminar el pago</button>
            )
        
        }
       
    }


    const redirectTo = ()=>{
        if(paid !== null){
           
            
            if(paid.paidCourse[0] === 1){
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
                                Paying course
                            </div>
                            <p>Once course is paid, you will be redirected to your courses</p>
                        </div>
                </div>
            )
        }
    }
    
    return (
        
        <div>
            <StudentHeader/>
            <button onClick={()=>setRender(true)}id="ATHMovil_Checkout_Button"></button>
            {renderFinishButton()}
            {redirectTo()}
        </div>
    )
}

export default Checkout 