import {REGISTER} from '../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case REGISTER:
            return action.payload

        default:
            return state
    }
}

