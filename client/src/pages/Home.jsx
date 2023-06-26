import React, { useContext } from 'react'
import { Box } from '@mui/material'
import { getAuth } from 'firebase/auth'
import UserInfo from '../components/UserInfo'
import FolderList from '../components/FolderList'
import { Outlet } from 'react-router-dom'

export default function Home() {
    const auth = getAuth()
    const handleLogout = () => {
        auth.signOut()
    }

    return (
        <div className='relative'>
            <h5 className='text-3xl font-semibold text-center mt-4'>Note App</h5>
            <UserInfo />
            <Box
                sx={{
                    width: '100%',
                    marginTop: '70px',
                    height: 500,
                    backgroundColor: '#fff',
                    boxShadow: '0px 2px 61px -13px rgba(0,0,0,0.75)',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    display: 'flex',
                }}
            >
                <FolderList />
                <Outlet />
            </Box>
        </div>
    )
}
