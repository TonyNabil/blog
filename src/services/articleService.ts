import article from "../models/article";
import Articles from "../models/article";
import Authors from "../models/author";

export default class Article {


    async addArticle(articleObject) {

        const { title, body, author } = articleObject

        const existingArticle: any = await Articles.findOne({ title, body, author })
        if (existingArticle) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "ARTICLE_IS_ALREADY_ADDED" }
        }

        const existingAuthor: any = await Authors.findOne({ _id: author })
        if (!existingAuthor) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "AUTHOR_IS_NOT_FOUND" }
        }

        const article = new Articles({
            title,
            body,
            author
        });

        await article.save();

        return article;
    }

    async getAllArticles() {

        let formattedArticles = []

        const articles: any = await Articles.find({}).populate('author').populate('comments.author').sort({ thumbsUp: -1 }).lean()

        if (!articles.length) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "NO_ARTICLES_FOUND" }
        }

        for (const article of articles) {
            let formattedArticle = this.formatArticleResponse(article)
            formattedArticles.push(formattedArticle)
        }

        return formattedArticles;
    }

    async getArticleById(id) {

        const article: any = await Articles.findOne({ _id: id }).populate('author').populate('comments.author').lean()

        if (!article) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "NO_ARTICLE_FOUND" }
        }

        return this.formatArticleResponse(article)
    }

    async searchForArticle(query) {

        let queryObject = {}
        queryObject["$or"] = [
            { "title": { $regex: query, $options: "i" } },
            { "body": { $regex: query, $options: "i" } }
        ]

        const articles: any = await Articles.find({ ...queryObject }).populate('author').lean()

        if (!articles) {
            return []
        }

        let formattedArticles = []
        for (const article of articles) {
            let formattedArticle = this.formatArticleResponse(article)
            formattedArticles.push(formattedArticle)
        }

        return { result: formattedArticles, total: articles.length };


    }

    async addCommentToArticle(commentObject) {
        const { body, authorId, articleId } = commentObject

        const article: any = await Articles.findOne({ _id: articleId })
        if (!article) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "ARTICLE_IS_NOT_FOUND" }
        }

        const existingAuthor: any = await Authors.findOne({ _id: authorId })
        if (!existingAuthor) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "AUTHOR_IS_NOT_FOUND" }
        }

        if (!article.comments || !article.comments.length) article.comments = []

        article.comments.push({
            body,
            author: authorId
        })

        await article.save();

        return article;

    }

    async thumbsUp(body) {
        const { authorId, articleId } = body

        const article: any = await Articles.findOne({ _id: articleId })
        if (!article) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "ARTICLE_IS_NOT_FOUND" }
        }

        const existingAuthor: any = await Authors.findOne({ _id: authorId })
        if (!existingAuthor) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "AUTHOR_IS_NOT_FOUND" }
        }

        if (article.thumbsUp.find(item => item.toString() == authorId)) {
            throw { statusCode: 400, status: "BAD_REQUEST", message: "AUTHOR_ALREADY_THUMB_UP_THIS_ARTICLE" }
        }

        article.thumbsUp.push(authorId)

        await article.save();

        return article;

    }


    formatArticleResponse(article) {

        let formattedArticle = {
            title: article.title,
            body: article.body,
            authorName: article.author.name,
            authorJob: article.author.job,
            comments: article.comments.length ? article.comments.map(comment => {
                return {
                    body: comment.body,
                    commentor: comment.author.name
                }
            }) : [],
            thumbsUp: article.thumbsUp.length ? article.thumbsUp.length : 0
        }

        return formattedArticle;
    }

}




