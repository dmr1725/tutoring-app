import {ENROLL} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case ENROLL:
            return action.payload

        default:
            return state
    }
}
