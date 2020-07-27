import {EDIT_SPOTS} from '../../actions/types'

export  default(state = null, action)=>{
    switch(action.type){
        case EDIT_SPOTS:
            return action.payload

        default:
            return state
    }
}
