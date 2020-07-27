import {COURSES_TO_ENROLL} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case COURSES_TO_ENROLL:
            return action.payload

        default:
            return state
    }
}
