import {CONFIRM_CODE} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case CONFIRM_CODE:
            return action.payload

        default:
            return state
    }
}
