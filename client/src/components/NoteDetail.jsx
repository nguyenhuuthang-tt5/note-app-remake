import React, { useEffect, useMemo, useState } from 'react'
import { ContentState, EditorState, convertFromHTML, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import { useLoaderData, useLocation, useSubmit } from 'react-router-dom'
import { debounce } from '@mui/material'
import { noteUtils } from '../utils/NoteUtils'


export default function noteDetail() {
    const note = useLoaderData()
    const { pathname } = useLocation()
    const submit = useSubmit()
    const [editorState, setEditorState] = useState(() => {
        return EditorState.createEmpty()
    })
    const [rawHTML, setRawHTML] = useState(note.content)

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content)
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks, 
            blocksFromHTML.entityMap
        )
        setEditorState(EditorState.createWithContent(state))
    }, [note.id])

    useEffect(() => {
        debouncedMemorized(rawHTML, note)
    }, [rawHTML])

    const debouncedMemorized = useMemo(() => {
        return debounce(async (rawHTML, note) => {
            if(rawHTML === note.content) {
                return
            }
            submit({
                updateNoteId: note.id,
                content: rawHTML
            }, { method: 'POST', action: pathname })
        }, 1000)
    }, [])
    
    useEffect(() => {
        setRawHTML(note.content)
    }, [note.content])
    
    const handleOnChange = (e) => {
        setEditorState(e)
        setRawHTML(draftToHtml(convertToRaw(e.getCurrentContent())))
    }
    return (
        <Editor 
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder='Write something' 
        />
    )
}
