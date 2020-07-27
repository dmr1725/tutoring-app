import {GET_NAME} from '../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case GET_NAME:
            return action.payload

        default:
            return state
    }
}

