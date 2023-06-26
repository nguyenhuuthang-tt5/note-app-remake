import { authors, folders, notes } from '../data/index.js'
import folderModel from '../models/Folder.js'
import authorModel from '../models/Author.js'
import noteModel from '../models/Note.js'

const resolvers = {
    Query: {
        folders: async (parent, args, context) => {  
            // return folders 
            const folders = await folderModel.find({
                authorId: context.uid
            }).sort({
                updatedAt: 'desc'
            })
            return folders
        },
        folder: (parent, args) => { 
            const folderId = args.folderId
            return folders.find((folder) => folder.id === folderId)
         },
        authors: () => { return authors },
        author: (parent, args) => { return authors.find((author) => author.id === args.authorId) },
        notes: async (parent, args) => { 
            const folderId = args.folderId
            const notes = noteModel.find({
                folderId: folderId
            })
            return notes
        },
        note: async (parent, args) => { 
            const noteId = args.noteId
            const note = await noteModel.findOne({
                _id: noteId
            })
            return note
        },
    },
    Author: {
        folders: (parent, args) => {
            return folders.filter((folder) => folder.authorId === parent.id)
        }
    },
    Folder: {
        author: async (parent, args) => {
            const authorId = parent.authorId
            const author = await authorModel.findOne({
                uid: authorId
            })
            return author
        },
        notes: (parent, args) => {
            return notes.filter((note) => note.folderId === parent.id)
        }
    },
    Note: {
        folder: (parent, args) => {
            const folderId = parent.folderId
            const folder = folderModel.findOne({
                _id: folderId
            })
            return folder
        }
    },
    Mutation: {
        addFolder: async (parent, args, context) => {
            const newFolder = new folderModel({ ...args, authorId: context.uid })
            await newFolder.save()
            return newFolder
        },
        addNote: async (parent, args) => {
            const newNote = new noteModel(args)
            await newNote.save()
            return newNote
        },
        register: async (parent, args) => {
            const foundUser = await authorModel.find({
                uid: args.uid
            })
            if(foundUser.length == 0) {
                const newAuthor = new authorModel(args)
                await newAuthor.save()
                console.log('add success');
                return newAuthor
            }
            console.log('user is already exist');
            return foundUser
        },
        updateNote: async (parent, args) => {
            const noteId = args.id
            const note = await noteModel.findByIdAndUpdate(noteId, args);
            return note
        }
    }
}
export default resolvers