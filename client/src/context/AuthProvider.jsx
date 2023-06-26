import { CircularProgress } from '@mui/material'
import { getAuth } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const AuthContext = createContext()
export default function AuthProvider({ children }) {
    const [user, setUser] = useState({})
    const auth = getAuth()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const unsubcribed = auth.onIdTokenChanged((user) => {
            if(user?.uid) {
                setUser(user)
                if(user.accessToken !== localStorage.getItem('accessToken')) {
                    localStorage.setItem('accessToken', user.accessToken)
                }
                setIsLoading(false)
                return
            }
            setIsLoading(false)
            setUser({})
            localStorage.clear()
            navigate('/login')
        })
        return(() => {
            unsubcribed()
        })
    }, [auth])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { isLoading ? <div className='w-[100%] h-[100%] flex justify-center items-center'><CircularProgress /></div> : children }
        </AuthContext.Provider>
    )
}
