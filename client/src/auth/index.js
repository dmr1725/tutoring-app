import { decode } from 'jsonwebtoken'
import axios from 'axios'


export const isAuthenticated = ()=>{
    const token = sessionStorage.getItem('jwt')

    try {
        decode(token)
        const {exp} = decode(token)
        // console.log(exp)
        // console.log(Date.now() >= exp*1000)
        if (Date.now() >= exp * 1000) {
            return false;
        }

 
    } catch(err){
        return false
    }

    return true

}

export const isTeacher = async()=>{
    const token = sessionStorage.getItem('jwt')

    try {
        const response = await axios.get('http://localhost:5000/api/user/getRole', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(response.data.role !== 'teacher'){
            // console.log(false)
            return false
        }

        
    }catch(err){
        return false
    }

    return true
}

export const isStudent = async()=>{
    const token = sessionStorage.getItem('jwt')

    try {
        const response = await axios.get('http://localhost:5000/api/user/getRole', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if(response){
            if(response.data.role === 'student'){
                return true
            }
        }
        return false

        
    }catch(err){
        return false
    }
}