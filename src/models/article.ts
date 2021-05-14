
import mongoose from "mongoose";
const Schema = mongoose.Schema;
import mongoosastic from "mongoosastic";
import Author from "./author"


import { config } from "../config/elasticSearch";


const articleSchema = new Schema({

    title: {
        type: String,
        required: true,
        es_indexed: true
    },
    body: {
        type: String,
        required: true,
        es_indexed: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
        es_indexed: true,
        es_type: 'nested',
        es_include_in_parent: true
    },
    comments: [
        {
            _id: false,
            body: {
                type: String,
                required: true,
                es_indexed: true
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Author",
                required: true,
                es_indexed: true,
                es_type: 'nested',
                es_include_in_parent: true
            }
        }
    ],
    thumbsUp: [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        es_indexed: true
    }],

}, {
    versionKey: false
});

articleSchema.plugin(mongoosastic, {
    "host": config.host,
    "port": config.port,
    "index": "articles",
    populate: [
        { path: 'author' },
        { path: 'comments.author' },
    ]
});


const article = mongoose.model("Article", articleSchema) as any;

article.createMapping((err, mapping) => {
    if (err) console.log(err);
    console.log("mapping created for Titles");
});

const stream = article.synchronize();

// const stream = Title.synchronize();
stream.on("error", function (err) {
    console.log(err.message);
});

export default article;