
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true,
    }

}, {
    versionKey: false
});

const Author = mongoose.model("Author", AuthorSchema) as any;

export default Author;