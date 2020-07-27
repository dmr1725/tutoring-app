import {NOT_PAID_MY_COURSE} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case NOT_PAID_MY_COURSE:
            return action.payload

        default:
            return state
    }
}
