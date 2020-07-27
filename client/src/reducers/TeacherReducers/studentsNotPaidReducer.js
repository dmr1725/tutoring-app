import {NOT_PAID_STUDENTS} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case NOT_PAID_STUDENTS:
            return action.payload

        default:
            return state
    }
}
