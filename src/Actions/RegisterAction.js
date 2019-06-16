// Types
import { CLEAR_REGISTER_ERRORS, UPDATE_REGISTER_EMAIL, UPDATE_REGISTER_PASSWORD,
    UPDATE_REGISTER_RETYPE, VALIDATE_REGISTER_DATA } from './ActionTypes'

export function clearRegisterErrors() {
    return { type: CLEAR_REGISTER_ERRORS }
}

export function updateRegisterEmail(payload) {
    return { type: UPDATE_REGISTER_EMAIL, payload: payload }
}

export function updateRegisterPassword(payload) {
    return { type: UPDATE_REGISTER_PASSWORD, payload: payload }
}

export function updateRegisterRetype(payload) {
    return { type: UPDATE_REGISTER_RETYPE, payload: payload }
}

export function validateRegisterData() {
    return { type: VALIDATE_REGISTER_DATA }
}