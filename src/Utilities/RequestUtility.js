import request from 'request'
import * as CookieUtility from './CookieUtility'

const Link = 'http://localhost:8100'

const attachSession = (requestOptions) => {
    let sessionToken = CookieUtility.getCookie('session-token', { path: '/portal' })
    if (sessionToken !== undefined) {
        requestOptions.headers = {
            'session-token': sessionToken
        }
    }
    return requestOptions
}

const attachParameters = (requestParameters) => {
    if (requestParameters === undefined) {
        return ''
    }
    else {
        let parameterKeys = Object.keys(requestParameters)
        let parameterString = '?'
        for (let i = 0; i < parameterKeys.length; i++) {
            parameterString = parameterString + parameterKeys[i] + '=' + requestParameters[parameterKeys[i]]
            if ((i + 1) < parameterKeys.length) {
                parameterString = parameterString + '&'
            }
        }
        return parameterString
    }
}

export function getRequest(url, data) {
    return new Promise((resolve, reject) => {
        request.get(Link + url + attachParameters(data), attachSession({}), (error, response) => {
            error ? reject(error) : resolve(response)
        })
    })
}

export function postRequest(url, data) {
    return new Promise((resolve, reject) => {
        request.post(Link + url, attachSession({ body: data, json: true }), (error, response) => {
            error ? reject(error) : resolve(response)
        })
    })
}

export function putRequest(url, data) {
    return new Promise((resolve, reject) => {
        request.put(Link + url, attachSession({ body: data, json: true }), (error, response) => {
            error ? reject(error) : resolve(response)
        })
    })
}

export function deleteRequest(url, data) {
    return new Promise((resolve, reject) => {
        request.delete(Link + url + attachParameters(data), attachSession({}), (error, response) => {
            error ? reject(error) : resolve(response)
        })
    })
}

export function headRequest(url) {
    return new Promise((resolve, reject) => {
        request.head(Link + url, attachSession({}), (error, response) => {
            error ? reject(error) : resolve(response)
        })
    })
}