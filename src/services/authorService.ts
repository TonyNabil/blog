import Authors from "../models/author";

export default class Author {


    async addAuthor(authorObject) {

        const { name, job } = authorObject

        const existingAuthor: any = await Authors.findOne({ name, job })

        if (existingAuthor) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "AUTHOR_IS_ALREADY_ADDED" }
        }

        const author = new Authors({
            name,
            job
        });

        await author.save();

        return author;
    }

    async getAllAuthors() {


        const authors: any = await Authors.find({}).select('name job')

        if (!authors) {
            return []
        }


        return authors;
    }

    async getAuthorById(id) {


        const author: any = await Authors.findOne({ _id: id }).select('name job -_id')

        if (!author) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "NO_AUTHOR_FOUND" }
        }


        return author;
    }

}




