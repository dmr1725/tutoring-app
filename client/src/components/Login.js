import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {sign_in} from '../actions'


const Login = ()=>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth =  useSelector(state => state.signInReducer)
    const dispatch = useDispatch()

    // useEffect(()=>{
    //     console.log('hola')
    // },[])

    function handleEmailChange(e){
        const text = e.target.value
        setEmail(text)
    }

    function handlePasswordChange(e){
        const text = e.target.value
        setPassword(text)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(sign_in(email, password))
        console.log('trueee')
    }

    function redirectTo(){
        if(auth){
            if(auth.message === 'Unable to log in'){
                return <h1> {auth.message} </h1>
            }
        }

        if(auth){
            if(auth.user && auth.user.role === 'teacher'){
                return <Redirect to="/teacher/welcome"/>
            }
            else{
                return <Redirect to="/student/hello"/>
            }
        }
    }
   
    
    return (
        
        <div className="diego">
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h1 className="ui image header">
                        <div className="content">
                            Login
                        </div>
                    </h1>
                    <form className="ui form" onSubmit={handleSubmit}>
                        <input name="email" placeholder="E-mail address"
                             value={email}
                             onChange={handleEmailChange}
                        />
                        <input name="password" placeholder="Password"
                             value={password}
                             onChange={handlePasswordChange}
                        />
                        <button className="ui button primary">
                            Submit
                        </button>
                        {redirectTo()}
                    </form>
                    
                </div>
            </div>
        </div>
    
     )
}

export default Login