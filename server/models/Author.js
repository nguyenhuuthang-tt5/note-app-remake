import mongoose from "mongoose";

const authorSchema = mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true
    }
}, { timestamps: true })

const authorModel = mongoose.model('authors', authorSchema)
export default authorModel