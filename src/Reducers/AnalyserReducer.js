// Types
import { UPDATE_SUPPORTED_LANGUAGES, UPDATE_SNIPPET_HISTORY, UPDATE_SNIPPET_DATA,
    UPDATE_SNIPPET_CONTENT, UPDATE_SNIPPET_LANGUAGE, CLEAR_SNIPPET_DATA } from '../Actions/ActionTypes'

const initialState = {
    languagesList: [],
    snippetHistory: [],
    snippetData: {
        snippetId: 0,
        snippetEmail: '',
        snippetStamp: null,
        snippetContent: '',
        snippetLanguage: '',
        snippetErrors: []
    }
}

export default function analyserReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SUPPORTED_LANGUAGES: {
            let newState = Object.assign({}, state)
            newState.languagesList = action.payload
            return newState
        }
        case UPDATE_SNIPPET_HISTORY: {
            let newState = Object.assign({}, state)
            newState.snippetHistory = action.payload
            return newState
        }
        case UPDATE_SNIPPET_DATA: {
            let newState = Object.assign({}, state)
            newState.snippetData = action.payload
            return newState
        }
        case UPDATE_SNIPPET_CONTENT: {
            let newState = Object.assign({}, state)
            newState.snippetData.snippetContent = action.payload
            return newState
        }
        case UPDATE_SNIPPET_LANGUAGE: {
            let newState = Object.assign({}, state)
            newState.snippetData.snippetLanguage = action.payload
            return newState
        }
        case CLEAR_SNIPPET_DATA: {
            let newState = Object.assign({}, state)
            newState.snippetData = {
                snippetId: 0,
                snippetEmail: '',
                snippetStamp: null,
                snippetContent: '',
                snippetLanguage: state.languagesList[0].value,
                snippetErrors: []
            }
            return newState
        }
        default: {
            return state
        }
    }
}