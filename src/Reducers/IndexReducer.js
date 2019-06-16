// Types
import { UPDATE_INDEX_SCREEN } from '../Actions/ActionTypes'

const initialState = {
    activeScreen: 'Login'
}

export default function indexReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_INDEX_SCREEN: {
            let newState = Object.assign({}, state)
            newState.activeScreen = action.payload
            return newState
        }
        default: {
            return state
        }
    }
}