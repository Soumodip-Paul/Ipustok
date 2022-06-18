import { showErrorAlert, showSuccessAlert } from './components/items/Toast'

export const loginWithCredentials = async (auth, user, password) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/auth/local`, {
        method: 'POST',
        body: JSON.stringify({ identifier: user, password: password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

    })
    const data = await response.json()
    console.log(data)
    if (!response.ok) {
        showErrorAlert('Something Wrong');
        auth.setAuthToken(null,null)
        return
    }
    auth.setAuthToken(data.jwt,data.user) 
    showSuccessAlert("Successfully Logged In")
}

export const fetchMyDetails = async (jwtToken) => {
    if (jwtToken === undefined || !jwtToken ) return null
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/users/me`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+ jwtToken
        }),
    })
    if (!response.ok) return null
    const data = await response.json()
    return data
}
