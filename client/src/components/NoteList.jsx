import React, { useState } from 'react'
import { AiFillFileAdd } from 'react-icons/all'
import Note from './Note'
import { Outlet, useLoaderData, useParams, useSubmit } from 'react-router-dom'
import { Dialog, IconButton, Tooltip, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material'


export default function NoteList() {
    const submit = useSubmit()
    const params = useParams()
    const notes = useLoaderData()
    
    const [newNoteContent, setNewNoteContent] = useState('');
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
        setNewNoteContent('')
    };
    const handleNewNoteContentOnChange = (e) => {
        setNewNoteContent(e.target.value)
    }
    const handleSubmit = async () => {
        submit({
            content: newNoteContent,
            folderId: params.folderId
        }, { method: 'POST', action: `/folders/${params.folderId}` })
        // const newNote = {
        //     content: newNoteContent,
        //     folderId: params.folderId
        // }
        // const data = await noteUtils.addNote(newNote)
        setNewNoteContent('')
        setOpen(false)
        // reloadData()
    }
    return (
        <div className='w-[75%] flex-shrink-0 flex'>
            <div className='w-[35%] bg-gray-500 px-3 py-4'>
                <div className="flex justify-between items-center pr-2 mt-2">
                    <p className='text-black text-lg font-medium'>Notes</p>
                    <Tooltip title='Create note'>
                        <IconButton color='#000' onClick={handleClickOpen}>
                            <AiFillFileAdd className='text-2xl text-black cursor-pointer'/>
                        </IconButton>
                    </Tooltip>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>New note</DialogTitle>
                        <DialogContent>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Content"
                            type="text"
                            fullWidth
                            variant="standard"
                            autoComplete='off'
                            value={newNoteContent}
                            onChange={handleNewNoteContentOnChange}
                        />
                        </DialogContent>
                        <DialogActions>
                            <Button variant='outlined' size='small' onClick={handleClose}>Cancel</Button>
                            <Button variant='outlined' size='small' onClick={handleSubmit}>Create</Button>
                        </DialogActions>
                    </Dialog>
                </div>
                <div className='w-full h-full flex flex-col pr-2 justify-start'>
                    {
                        notes.map((note) => {
                            return <Note key={note.id} note={note}/>
                        })
                    }
                </div>
            </div>
            <div className="w-[65%] flex-shrink-0 flex text-center px-2">
                <Outlet />
            </div>
        </div>
  )
}
