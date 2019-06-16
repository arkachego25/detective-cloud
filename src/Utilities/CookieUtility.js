import cookie from 'react-cookies'

export function getCookie(cookieName, cookieOptions) {
    return cookie.load(cookieName, (cookieOptions === undefined) ? { path: '/' } : cookieOptions)
}

export function setCookie(cookieName, cookieValue, cookieOptions) {
    return cookie.save(cookieName, cookieValue, (cookieOptions === undefined) ? { path: '/' } : cookieOptions)
}

export function deleteCookie(cookieName, cookieOptions) {
    return cookie.remove(cookieName, (cookieOptions === undefined) ? { path: '/' } : cookieOptions)
}