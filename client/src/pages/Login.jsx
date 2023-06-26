import React, { useContext } from 'react'
import { Button } from '@mui/material'
import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import { Navigate } from 'react-router-dom'
import { graphRequest } from '../utils/request'
import { AuthContext } from '../context/AuthProvider'

export default function Login() {
    const auth = getAuth()
    const { user } = useContext(AuthContext)
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider()
        const { user } = await signInWithPopup(auth, provider)
        const query = `mutation Mutation($uid: String!, $name: String!) {
            register(uid: $uid, name: $name) {
              uid
              name
            }
          }
        `
        const payload = {
            query,
            variables: {
                uid: user.uid,
                name: user.displayName
            }
        }
        await graphRequest(payload)
    }

    if(localStorage.getItem('accessToken')) {
        return <Navigate to={'/'} />
    }

    return (
    <div className='text-center mt-4'>
        <h2 className='text-3xl font-bold mb-3'>Login once, access all</h2>
        <Button variant='contained' size='large' onClick={handleLogin}>Login with Google</Button>
    </div>
    )
}
