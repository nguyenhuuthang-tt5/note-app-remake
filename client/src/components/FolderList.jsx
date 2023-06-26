import React, { useEffect, useState } from 'react'
import { IoIosFolder } from 'react-icons/io'
import Folder from './Folder'
import { Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material'
import { addNewFolder, folderUtil } from '../utils/FolderUtils'
import { Navigate } from 'react-router-dom'
import { getAuth } from 'firebase/auth'


export default function FolderList() {
    const auth = getAuth()
    const [folderState, setFolderState] = useState([])
    const [open, setOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState('');

    const reloadData = async () => {
        const data = await folderUtil()
        if(!data) {
            auth.signOut()
            return <Navigate to={'/login'}/>
        }
        setFolderState(data)
    }
    useEffect(() => {
        reloadData()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setNewFolderName('')
    };

    const handleNewFolderNameOnChange = (e) => {
        setNewFolderName(e.target.value)
    }

    const handleSubmit = async () => {
        const newFolder = {
            name: newFolderName
        }
        await addNewFolder(newFolder)
        setNewFolderName('')
        setOpen(false)
        reloadData()
    }

    return (
        <div className='w-[25%] h-full bg-slate-600 px-3 py-4'>
            <div className="flex justify-between items-center pr-2">
                <p className='text-white text-lg'>Folders</p>
                <Tooltip title='Add folder'>
                    <IconButton color='#000' onClick={handleClickOpen}>
                        <IoIosFolder className='text-2xl text-white cursor-pointer'/>
                    </IconButton>
                </Tooltip>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New folder</DialogTitle>
                    <DialogContent>
                    <TextField
                        required
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Folder name"
                        type="text"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        value={newFolderName}
                        onChange={handleNewFolderNameOnChange}
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' size='small' onClick={handleClose}>Cancel</Button>
                        <Button variant='outlined' size='small' onClick={handleSubmit}>Create</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <div className={`w-full h-full flex flex-col pr-2 justify-start ${ folderState.length > 8 ? 'overflow-y-scroll' : '' }`}>
                {
                    folderState.map((folder) => {
                        return <Folder key={folder.id} folder={folder} />
                    })
                }
            </div>
        </div>
    )
}
