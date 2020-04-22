export function saveToStorage(remember, accessToken, refreshToken, username) {
    let storage
    if (remember) {
        storage = localStorage
    } else {
        storage = sessionStorage
    }

    storage.setItem('accessToken', accessToken)
    storage.setItem('refreshToken', refreshToken)
    storage.setItem('username', username)
}

export function clearStorage() {
    if (localStorage.length > 0) {
        localStorage.clear()
    }
    if (sessionStorage.length > 0) {
        sessionStorage.clear()
    }
}

export function isLocalStorage() {
    return !!localStorage.getItem('accessToken')
        && !!localStorage.getItem('refreshToken')
        && !!localStorage.getItem('username')
}

export function isSessionStorage() {
    return !!sessionStorage.getItem('accessToken')
        && !!sessionStorage.getItem('refreshToken')
        && !!sessionStorage.getItem('username')
}

export function updateSessionStorage(accessToken, refreshToken) {
    sessionStorage.setItem('accessToken', accessToken)
    sessionStorage.setItem('refreshToken', refreshToken)
}

export function updateLocalStorage(accessToken, refreshToken) {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
}