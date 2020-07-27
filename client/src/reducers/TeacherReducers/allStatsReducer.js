import {ALL_STATS} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case ALL_STATS:
            return action.payload

        default:
            return state
    }
}
