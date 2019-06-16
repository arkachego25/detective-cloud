// Types
import { CLEAR_LOGIN_ERRORS, UPDATE_LOGIN_EMAIL, UPDATE_LOGIN_PASSWORD, VALIDATE_LOGIN_DATA } from './ActionTypes'

export function clearLoginErrors() {
    return { type: CLEAR_LOGIN_ERRORS }
}

export function updateLoginEmail(payload) {
    return { type: UPDATE_LOGIN_EMAIL, payload: payload }
}

export function updateLoginPassword(payload) {
    return { type: UPDATE_LOGIN_PASSWORD, payload: payload }
}

export function validateLoginData() {
    return { type: VALIDATE_LOGIN_DATA }
}