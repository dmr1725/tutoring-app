import {TODAY_STUDENT} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case TODAY_STUDENT:
            return action.payload

        default:
            return state
    }
}
