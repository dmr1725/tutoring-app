import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../actions'



const Login = ()=>{
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const auth = useSelector(state => state.registerReducer)
    const dispatch = useDispatch()

  
    const handleName = (e)=>{
        const text = e.target.value
        setName(text)
    }

    const handleLastName = (e)=>{
        const text = e.target.value
        setLastName(text)
    }

    const handleEmail = (e)=>{
        const text = e.target.value
        setEmail(text)
    }

    const handlePassword = (e)=>{
        const text = e.target.value
        setPassword(text)
    }
    
    const handleRole = (e)=>{
        const text = e.target.value
        setRole(text)
    }

    const handleForm = (e)=>{
        e.preventDefault()
        dispatch(register(name, lastName, email, password, role))

    }

    const redirectTo = ()=>{
        if(auth){
            if(auth.message){
                return <div>{auth.message}</div>
            }
        }

        if(auth){
            if(auth.msg){
                if(auth.user && auth.user.role === 'teacher'){
                    return <Redirect to="/teacher/welcome"/>
                }
                else{
                    return <Redirect to="/student/hello"/>
                }
            }
        }
    }

   
    
    return (
        
        <div className="diego">
            <div className="ui middle aligned center aligned grid">
                <div className="column">
                    <h1 className="ui image header">
                        <div className="content">
                            Register
                        </div>
                    </h1>
                    <form className="ui form" onSubmit={handleForm} >
                        <label>Name</label>
                        <input name="name" 
                             value={name}
                             onChange={handleName}
                        />
                        <label>Last Name</label>
                        <input name="lastName" 
                            value={lastName}
                            onChange={handleLastName}
                        />
                        <label>Email</label>
                        <input name="email" 
                            value={email}
                            onChange={handleEmail}
                        />
                        <label>Password</label>
                        <input name="password" 
                            value={password}
                            onChange={handlePassword}
                        />
                        <label>Role</label>
                        <select className="ui fluid search dropdown" multiple="" onChange={handleRole}>
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                        </select>
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