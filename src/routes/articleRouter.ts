import express from "express";
import { articleController } from "../controllers/articleController";
import {
    addArticleValidator, getArticleByIdValidator, searchForArticleValidator,
    addCommentToArticleValidator, thumbsUpValidator
} from "../validators/articleValidators"

const router = express.Router();

router.post("/addArticle", addArticleValidator, articleController.addArticle);
router.get("/getAllArticles", articleController.getAllArticles);
router.get("/getArticleById", getArticleByIdValidator, articleController.getArticleById);
router.post("/searchForArticle", searchForArticleValidator, articleController.searchForArticle);
router.post("/addCommentToArticle", addCommentToArticleValidator, articleController.addCommentToArticle);
router.post("/thumbsUp", thumbsUpValidator, articleController.thumbsUp);



export default router;
