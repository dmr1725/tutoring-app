import {STUDENTS_PRESENT} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case STUDENTS_PRESENT:
            return action.payload

        default:
            return state
    }
}
