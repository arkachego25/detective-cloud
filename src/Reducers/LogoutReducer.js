// Types
import { TOGGLE_LOGOUT_MODAL } from '../Actions/ActionTypes'

const initialState = {
    modalVisible: false
}

export default function logoutReducer(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_LOGOUT_MODAL: {
            let newState = Object.assign({}, state)
            newState.modalVisible = !newState.modalVisible
            return newState
        }
        default: {
            return state
        }
    }
}