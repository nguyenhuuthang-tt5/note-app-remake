import { RxValueNone } from "react-icons/rx";
import { graphRequest } from "./request";

export const noteUtils = {
    noteFromFolderId: async ({ params }) => {
        const folderId = params.folderId
        const query = `query Notes($folderId: String) {
            notes(folderId: $folderId) {
              id
              content
            }
          }`
        const payload = {
            query,
            variables: {
                folderId
            }
        }
        const data = await graphRequest(payload)
        return !data ? null : data.notes

    },
    noteFromNoteId: async ({ params }) => {
        const noteId = params.noteId
        const query = `query Note($noteId: String) {
            note(noteId: $noteId) {
              id
              content
            }
        }`
        const payload = {
            query,
            variables: {
                noteId
            }
        }
        const data = await await graphRequest(payload)
        return !data ? null : data.note
    },
    addNote: async ({params, request}) => {
        const newNote = await request.formData()
        const formDataObject = {};
        newNote.forEach((value, key) => (formDataObject[key] = value))

        const query = `mutation AddNote($content: String!, $folderId: ID!) {
            addNote(content: $content, folderId: $folderId) {
              id
              content
          
            }
        }`;
        const payload = {
            query,
            variables: {
                content: formDataObject.content,
                folderId: formDataObject.folderId
            }
        }
        const data = await graphRequest(payload)
        return data
    },
    updateNote: async ({ params, request }) => {
        const updateNoteData = await request.formData()
        const formDataObj = {}
        updateNoteData.forEach((value, key) => formDataObj[key] = value)
        console.log(formDataObj);
        const query = `mutation UpdateNote($updateNoteId: String!, $content: String!) {
            updateNote(id: $updateNoteId, content: $content) {
              id
              content
            }
        }`
        const payload = {
            query,
            variables: {
                updateNoteId: formDataObj.updateNoteId,
                content: formDataObj.content
            }
        }
        const { updateNote } = await graphRequest(payload)
        return updateNote
    }
}