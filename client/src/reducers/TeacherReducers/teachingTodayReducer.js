import {TODAY_TEACHER} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case TODAY_TEACHER:
            return action.payload

        default:
            return state
    }
}
