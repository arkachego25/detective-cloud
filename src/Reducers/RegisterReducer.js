// Libraries
import React from 'react'

// Types
import { UPDATE_REGISTER_EMAIL, UPDATE_REGISTER_PASSWORD, UPDATE_REGISTER_RETYPE, VALIDATE_REGISTER_DATA } from '../Actions/ActionTypes'

const initialState = {
    emailAddress: '',
    loginPassword: '',
    retypePassword: '',
    formErrors: []
}

export default function registerReducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_REGISTER_EMAIL: {
            let newState = Object.assign({}, state)
            newState.emailAddress = action.payload
            return newState
        }
        case UPDATE_REGISTER_PASSWORD: {
            let newState = Object.assign({}, state)
            newState.loginPassword = action.payload
            return newState
        }
        case UPDATE_REGISTER_RETYPE: {
            let newState = Object.assign({}, state)
            newState.retypePassword = action.payload
            return newState
        }
        case VALIDATE_REGISTER_DATA: {
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
            if (newState.loginPassword.length === 0) {
                newState.formErrors.push(<div><b>Login Password</b> is a required field.</div>)
            }
            else if (newState.loginPassword.length < 8) {
                newState.formErrors.push(<div><b>Login Password</b> cannot be of less than 8 chracters.</div>)
            }
            else if (newState.loginPassword.length > 30) {
                newState.formErrors.push(<div><b>Login Password</b> cannot be of more than 30 chracters.</div>)
            }
            if (newState.retypePassword.length === 0) {
                newState.formErrors.push(<div><b>Retype Password</b> is a required field.</div>)
            }
            else if (newState.retypePassword !== newState.loginPassword) {
                newState.formErrors.push(<div><b>Retype Password</b> must be same as the <b>Login Password</b>.</div>)
            }
            return newState
        }
        default: {
            return state
        }
    }
}