// Types
import { CLEAR_RESET_ERRORS, UPDATE_RESET_EMAIL, VALIDATE_RESET_DATA } from './ActionTypes'

export function clearResetErrors() {
    return { type: CLEAR_RESET_ERRORS }
}

export function updateResetEmail(payload) {
    return { type: UPDATE_RESET_EMAIL, payload: payload }
}

export function validateResetData() {
    return { type: VALIDATE_RESET_DATA }
}