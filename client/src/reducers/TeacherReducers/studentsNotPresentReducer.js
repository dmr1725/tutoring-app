import {STUDENTS_NOT_PRESENT} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case STUDENTS_NOT_PRESENT:
            return action.payload

        default:
            return state
    }
}
