import {CREATE_COURSE} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case CREATE_COURSE:
            return action.payload

        default:
            return state
    }
}
