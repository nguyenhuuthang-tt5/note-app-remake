import mongoose from "mongoose";

const noteSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    folderId: {
        type: String,
        required: true
    }
}, { timestamps: true })

const noteModel = mongoose.model('notes', noteSchema)
export default noteModel