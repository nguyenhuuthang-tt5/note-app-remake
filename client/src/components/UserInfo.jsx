import { Avatar, Menu, MenuItem } from '@mui/material'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthProvider';

export default function UserInfo() {
  const { user } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  //
  const handleClose = () => {
    setAnchorEl(null)
  }
  //
  const handleLogout = () => {
    user.auth.signOut()
    setAnchorEl(null);
  };

  return (
    <>
      <div className='group absolute w-auto h-auto right-0 group flex items-center cursor-pointer' onClick={handleClick}>
        <h3 className="group-hover:text-[19px] mr-3 text-lg font-medium transition-all">{user?.displayName}</h3>
        <Avatar className='group-hover:w-[51px] group-hover:h-[51px]' src={user?.photoURL} sx={{ width: 50, height: 50 }}/>
      </div>
      <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  )
}
