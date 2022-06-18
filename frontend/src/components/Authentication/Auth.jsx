import { createContext, useState, useEffect, useContext } from 'react'
import { showSuccessAlert } from '../items/Toast'


export const AuthContext = createContext({ authToken: null, setAuthToken: (token,user) => { }, logOut: () => {}, user: null })

export const Auth = ({ children }) => {

    const [authToken, setAuthToken1] = useState(null)
    const [user, setUser] = useState(null)

    const setAuthToken = (token, user) => {
        setAuthToken1(token)
        setUser(user)
        if (token === null) {
            window.localStorage.removeItem(process.env.NEXT_PUBLIC_TOKEN_LABEL)
            window.localStorage.removeItem(process.env.NEXT_PUBLIC_USER)
        }
        else {
            window.localStorage.setItem(process.env.NEXT_PUBLIC_TOKEN_LABEL, token)
            window.localStorage.setItem(process.env.NEXT_PUBLIC_USER, JSON.stringify(user))
        }
    }

    const logOut = () => {
        setAuthToken(null,null)
        showSuccessAlert("Successfully logged Out")
    }

    return (
        <AuthContext.Provider value={{ authToken, setAuthToken, user, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export const AuthData = () => {
    return useContext(AuthContext)
}
