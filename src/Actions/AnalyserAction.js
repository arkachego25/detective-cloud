// Types
import { UPDATE_SUPPORTED_LANGUAGES, UPDATE_SNIPPET_HISTORY, UPDATE_SNIPPET_DATA,
    UPDATE_SNIPPET_CONTENT, UPDATE_SNIPPET_LANGUAGE, CLEAR_SNIPPET_DATA } from './ActionTypes'

export function updateSupportedLanguages(payload) {
    return { type: UPDATE_SUPPORTED_LANGUAGES, payload: payload }
}

export function updateSnippetHistory(payload) {
    return { type: UPDATE_SNIPPET_HISTORY, payload: payload }
}

export function updateSnippetData(payload) {
    return { type: UPDATE_SNIPPET_DATA, payload: payload }
}

export function updateSnippetContent(payload) {
    return { type: UPDATE_SNIPPET_CONTENT, payload: payload }
}

export function updateSnippetLanguage(payload) {
    return { type: UPDATE_SNIPPET_LANGUAGE, payload: payload }
}

export function clearSnippetData(payload) {
    return { type: CLEAR_SNIPPET_DATA, payload: payload }
}