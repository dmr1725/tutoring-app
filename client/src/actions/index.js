import {SIGN_IN, TEACHER_COURSES, SEND_EMAIL, PAID_STUDENTS, NOT_PAID_STUDENTS, TODAY_TEACHER, STUDENTS_NOT_PRESENT, STUDENTS_PRESENT,
        ALL_STATS, CREATE_COURSE, EDIT_SPOTS, GET_NAME, COURSES_TO_ENROLL, ENROLL, MY_COURSES, NOT_PAID_MY_COURSE, PAY_COURSE,
        TODAY_STUDENT, CHECK_PRESENCE, UPDATE_CODE, CONFIRM_CODE } from './types'

import axios from 'axios'
const url = 'http://localhost:5000/api/user'


export const sign_in = (email, password)=>{

    // console.log(email)
    // este inner function redux-thunk la llama automaticamente
    return async (dispatch)=>{
        
        const response = await axios.post(`${url}/login`, {
           email: email,
           password: password
        })

        // console.log(response.data.token)
        if(response.data.token){
            sessionStorage.setItem('jwt', response.data.token)
        }
        
        dispatch({type: SIGN_IN, payload: response.data})

    }
    
}

export const findTeacherCourses = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async (dispatch)=>{
       
        const response = await axios.get(`${url}/teacher/myCourses`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        
        
        dispatch({type: TEACHER_COURSES, payload: response.data})

    }
}

export const send_email_toStudents = (course_id, message)=>{
    console.log(course_id)
    console.log(message)
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/sendEmailToStudents`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
                message: message
            }
        })

        dispatch({type: SEND_EMAIL, payload: response.data})
    }
}

export const paid_students = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/studentsPaid`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
               
            }
        })

        dispatch({type: PAID_STUDENTS, payload: response.data})
    }
}

export const not_paid_students = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/studentsNotPaid`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
               
            }
        })

        dispatch({type: NOT_PAID_STUDENTS, payload: response.data})
    }
}

export const teacher_course_today = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async (dispatch)=>{
       
        const response = await axios.get(`${url}/teacher/teachingToday`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        
        
        dispatch({type: TODAY_TEACHER, payload: response.data})

    }
}

export const students_present = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/studentsPresent`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
               
            }
        })

        dispatch({type: STUDENTS_PRESENT, payload: response.data})
    }
}

export const students_not_present = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/studentsNotPresent`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
               
            }
        })

        dispatch({type: STUDENTS_NOT_PRESENT, payload: response.data})
    }
}

export const all_stats = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/classStats`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
               
            }
        })

        dispatch({type: ALL_STATS, payload: response.data})
    }
}

export const create_course = (courseName, testNumber, spots, startDate, endDate)=>{
    console.log(courseName)
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/createCourse`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_name: courseName,
                test_number: testNumber,
                spots: spots,
                start_date: startDate,
                end_date: endDate
               
            }
        })

        dispatch({type: CREATE_COURSE, payload: response.data})
    }
}

export const edit_spots = (id, spots)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/teacher/updateSpots`,
            method: 'patch', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
               spots: spots,
               id: id
            }
        })

        dispatch({type: EDIT_SPOTS, payload: response.data})
    }
}

export const getName = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async (dispatch)=>{
       
        const response = await axios.get(`${url}/getName`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        
        
        dispatch({type: GET_NAME, payload: response.data})

    }
}

export const courses_to_enroll = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async (dispatch)=>{
       
        const response = await axios.get(`${url}/student/findCoursesNotTaught`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        
        
        dispatch({type: COURSES_TO_ENROLL, payload: response.data})

    }
}

export const enroll = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/student/enroll`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
                
            }
        })

        dispatch({type: ENROLL, payload: response.data})
    }
}

export const my_courses = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async (dispatch)=>{
       
        const response = await axios.get(`${url}/student/coursesEnrolled`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        dispatch({type: MY_COURSES, payload: response.data})
    }
}

export const not_paid_courses = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async (dispatch)=>{
       
        const response = await axios.get(`${url}/student/coursesNotPaid`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        dispatch({type: NOT_PAID_MY_COURSE, payload: response.data})
    }
}

export const pay_course = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/student/paidCourse`,
            method: 'patch', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
                
            }
        })

        dispatch({type: PAY_COURSE, payload: response.data})
    }
}

export const course_today = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async (dispatch)=>{
       
        const response = await axios.get(`${url}/student/courseToday`, {
           headers: {
               Authorization: `Bearer ${token}`
           }
        })

        dispatch({type: TODAY_STUDENT, payload: response.data})
    }
}

export const check_presence = (course_id)=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/student/checkPresent`,
            method: 'post', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
                
            }
        })

        dispatch({type: CHECK_PRESENCE, payload: response.data})
    }
}

export const update_code = ()=>{
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/student/updateCode`,
            method: 'patch', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
           
        })

        dispatch({type: UPDATE_CODE, payload: response.data})
    }
}

export const confirm_code = (course_id, code)=>{
    // console.log(course_id)
    // console.log(code)
    const token = sessionStorage.getItem('jwt')
    return async(dispatch)=>{
        const response = await axios({
            url: `${url}/student/checkCodeUpdatePresent`,
            method: 'patch', 
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                course_id: course_id,
                code: code
            }
           
        })

        dispatch({type: CONFIRM_CODE, payload: response.data})
    }
}