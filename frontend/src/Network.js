import { showErrorAlert, showSuccessAlert } from './components/items/Toast'
import { toast } from "react-toastify";

export const loginWithCredentials = async (auth, user, password) => {
    const id = toast.loading("Please wait while we are logging you in...")
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/auth/local`, {
        method: 'POST',
        body: JSON.stringify({ identifier: user, password: password }),
        headers: new Headers({
            'Content-Type': 'application/json'
        }),

    })
    const data = await response.json()
    if (!response.ok) {
        toast.update(id, { render: "Unable to log in", type: "error", isLoading: false, autoClose: 1500, progress: undefined });
        auth.setAuthToken(null, null)
        return
    }
    auth.setAuthToken(data.jwt, data.user)
    toast.update(id, { render: "Succesfully Logged In", type: "success", isLoading: false, autoClose: 1500, progress: undefined });
}

export const fetchMyDetails = async (jwtToken) => {
    if (jwtToken === undefined || !jwtToken) return null
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/users/me`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + jwtToken
        }),
    })
    if (!response.ok) return null
    const data = await response.json()
    return data
}

export const updateProfile = async (auth, user, data) => {
    const id = toast.loading("Please wait...")
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/users/${user.id}`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.authToken
        }),
        body: JSON.stringify(data),
        method: 'PUT'
    })
    if (!response.ok) {
        toast.update(id, { render: "Unable to update profile", type: "error", isLoading: false });
        return
    }
    const recievedData = await response.json()
    auth.setAuthToken(auth.authToken, recievedData)
    toast.update(id, { render: "Profile Succesfully Updated", type: "success", isLoading: false });
}

export const fetchMyNotes = async (auth) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/notes`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.authToken
        }),
        method: 'GET'
    })
    if (!response.ok) {
        showErrorAlert("Something went wrong")
        return { data: [], meta: {} }
    }
    const { data, meta } = await response.json()
    return { data, meta }
}

export const addNote = async (auth, Data) => {
    const id = toast.loading("Adding Note...")
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/notes`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.authToken
        }),
        body: JSON.stringify({ data: Data }),
        method: 'POST'
    })
    if (!response.ok) {
        toast.update(id, {render:"Unable to add note", type:"error", progress:undefined, autoClose: 1500, isLoading:false})
        return { data: {}, meta: {} }
    }
    const { data, meta } = await response.json()
    toast.update(id, {render:"Note Successfully added", type:"success", progress:undefined, autoClose: 1500, isLoading:false})
    return { data, meta }
}

export const updateNote = async (auth, Id, Data) => {
    const id = toast.loading("Updating Note...")
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/notes/${Id}`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.authToken
        }),
        body: JSON.stringify({ data: Data }),
        method: 'PUT'
    })
    if (!response.ok) {
        toast.update(id, {render:"Unable to update note", type:"error", progress:undefined, autoClose: 1500, isLoading:false})
        return { data: {}, meta: {} }
    }
    const { data, meta } = await response.json()
    toast.update(id, {render:"Note Successfully Updated", type:"success", progress:undefined, autoClose: 1500, isLoading:false})
    return { data, meta }
}

export const deleteNote = async (auth,Id) => {
    const id = toast.loading("Deleting Note...")
    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API || 'http://localhost:1337'}/api/notes/${Id}`, {
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.authToken
        }),
        method: 'DELETE'
    })
    if (!response.ok) {
        toast.update(id, {render:"Unable to delete note", type:"error", progress:undefined, autoClose: 1500, isLoading:false})
        return { data: {}, meta: {} }
    }
    const { data, meta } = await response.json()
    toast.update(id, {render:"Note Successfully Deleted", type:"success", progress:undefined, autoClose: 1500, isLoading:false})
    return { data, meta }
}
