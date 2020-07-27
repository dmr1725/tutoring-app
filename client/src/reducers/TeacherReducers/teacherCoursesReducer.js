import {TEACHER_COURSES} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case TEACHER_COURSES:
            return action.payload

        default:
            return state
    }
}
