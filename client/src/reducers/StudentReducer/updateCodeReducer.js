import {UPDATE_CODE} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case UPDATE_CODE:
            return action.payload

        default:
            return state
    }
}
