import express from "express";
import { elasticSearchController } from "../controllers/elasticSearchController";
import { searchForArticleValidator } from "../validators/articleValidators"


const router = express.Router();

router.post("/search", searchForArticleValidator, elasticSearchController.search);

export default router;
