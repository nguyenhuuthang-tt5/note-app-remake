import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthProvider'
import { Button } from '@mui/material'
import { getAuth } from 'firebase/auth'

export default function Navbar() {
    const { user } = useContext(AuthContext)
    const auth = getAuth()

    const handleLogout = () => {
        auth.signOut()
    }
    return (
        <div>
            <div className='flex mb-5 w-[50%] justify-around p-2 items-center'>
                <NavLink to={'/'}>Home</NavLink>
                <NavLink to={'/account'}>Account</NavLink>
                <NavLink to={'/about'}>About</NavLink>
                {
                    user?.uid 
                    ? <Button variant='contained' onClick={handleLogout}>Logout</Button> 
                    : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
            <Outlet />
        </div>
    )
}
