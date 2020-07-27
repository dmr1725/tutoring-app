import {PAY_COURSE} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case PAY_COURSE:
            return action.payload

        default:
            return state
    }
}
