import request from "supertest";
import app from "../src/app";
import Articles from "../src/models/article";
import Author from "../src/models/author";
import mongoose from 'mongoose'
import article from "../src/models/article";


afterAll(function (done) {
    mongoose.connection.close(function () {
        done();
    });

});

let authorId = mongoose.Types.ObjectId("5e568c23a63a1e14f8864a77")
let articleId = mongoose.Types.ObjectId("5e568c23a63a1e14f8864a75")

beforeAll(async (done) => {
    mongoose.connection.dropDatabase();

    await Author.collection.insertOne({
        "_id": authorId,
        "name": "TONY",
        "job": "developer"
    })

    await Articles.collection.insertOne({
        "_id": articleId,
        "title": "How Experts Figure What to Focus On",
        "body": "Of the many options in front of you, how do you know what to focus on? How do you know?",
        "author": authorId.toString(),
        "comments": [],
        "thumbsUp": []
    })

    done()
});

describe("Articles", () => {

    it('should add new article', async () => {
        const result = await request(app)
            .post('/article/addArticle')
            .send({
                title: "How Innovative Ideas Arise",
                body: "He decided to create the steel components first. After discovering that iron",
                author: authorId.toString()
            })

        expect(result.statusCode).toEqual(200)
    })

    it('should add commnet to article', async () => {

        const result = await request(app)
            .post('/article/addCommentToArticle')
            .send({
                articleId: articleId.toString(),
                authorId: authorId.toString(),
                body: "good article"
            })

        expect(result.statusCode).toEqual(200)
    })

    it('should add thumbUp article', async () => {

        const result = await request(app)
            .post('/article/thumbsUp')
            .send({
                articleId: articleId.toString(),
                authorId: authorId.toString()
            })

        expect(result.statusCode).toEqual(200)
    })

    it("it should getAllArticles", async () => {
        const result = await request(app).get("/article/getAllArticles")

        expect(result.statusCode).toEqual(200)
    });

    it("it should getArticleById", async () => {
        const { _id } = await Articles.findOne()
        const result = await request(app).get("/article/getArticleById")
            .query({
                id: _id.toString()
            });

        expect(result.statusCode).toEqual(200)

    });

    it('should add serch for article', async () => {

        const result = await request(app)
            .post('/article/searchForArticle')
            .send({
                query: "the"
            })

        expect(result.statusCode).toEqual(200)
    })


});


describe("ElasticSearch", () => {


    it('should add serch for article', async () => {

        const result = await request(app)
            .post('/elasticSearch/search')
            .send({
                query: "the"
            })

        expect(result.statusCode).toEqual(200)
    })


});