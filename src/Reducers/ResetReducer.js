// Libraries
import React from 'react'

// Types
import { UPDATE_RESET_EMAIL, VALIDATE_RESET_DATA } from '../Actions/ActionTypes'

const initialState = {
    emailAddress: '',
    formErrors: []
}

export default function resetReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_RESET_EMAIL: {
            let newState = Object.assign({}, state)
            newState.emailAddress = action.payload
            return newState
        }
        case VALIDATE_RESET_DATA: {
            let newState = Object.assign({}, state)
            newState.formErrors = []
            if (newState.emailAddress.length === 0) {
                newState.formErrors.push(<div><b>Email Address</b> is a required field.</div>)
            }
            else if (newState.emailAddress.length > 100) {
                newState.formErrors.push(<div><b>Email Address</b> cannot be of more than 100 chracters.</div>)
            }
            else if (!RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(newState.emailAddress)) {
                newState.formErrors.push(<div>Provided<b>Email Address</b> is not a valid one.</div>)
            }
            return newState
        }
        default: {
            return state
        }
    }
}