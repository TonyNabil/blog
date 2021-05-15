import express from "express";
import { articleController } from "../controllers/articleController";
import {
    addArticleValidator, getArticleByIdValidator, searchForArticleValidator,
    addCommentToArticleValidator, thumbsUpValidator
} from "../validators/articleValidators"

const router = express.Router();
//   POST /article
router.post("/addArticle", addArticleValidator, articleController.addArticle);
//   GET /article
router.get("/getAllArticles", articleController.getAllArticles);
//   GET /article/:id
router.get("/getArticleById", getArticleByIdValidator, articleController.getArticleById);
//   GET /article?query=blue
router.post("/searchForArticle", searchForArticleValidator, articleController.searchForArticle);
//   POST /article/:id/comment
router.post("/addCommentToArticle", addCommentToArticleValidator, articleController.addCommentToArticle);
//   POST /article/:id/thumbsUp
router.post("/thumbsUp", thumbsUpValidator, articleController.thumbsUp);



export default router;
