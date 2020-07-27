import {CHECK_PRESENCE} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case CHECK_PRESENCE:
            return action.payload

        default:
            return state
    }
}
