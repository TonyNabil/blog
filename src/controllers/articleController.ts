import { Response, Request } from "express";
import ArticleService from "../services/articleService";
import { handleErrors } from "../utils/utils"

class ArticleController {

    private articleObject: ArticleService;

    constructor() {
        this.articleObject = new ArticleService();
    }

    addArticle = async (req: Request, res: Response) => {
        try {
            await this.articleObject.addArticle(req.body);
            return res.send({ status: "OK" });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    getAllArticles = async (req: Request, res: Response) => {
        try {
            const result = await this.articleObject.getAllArticles();
            return res.send({ status: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    getArticleById = async (req: Request, res: Response) => {
        try {

            const result = await this.articleObject.getArticleById(req.query.id);
            return res.send({ status: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    searchForArticle = async (req: Request, res: Response) => {
        try {

            let query = req.body.query === "ALL" ? "" : req.body.query;
            query = query ? query : "";

            const result = await this.articleObject.searchForArticle(query);
            return res.send({ status: "SUCCESS", ...result });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    addCommentToArticle = async (req: Request, res: Response) => {
        try {

            await this.articleObject.addCommentToArticle(req.body);
            return res.send({ status: "OK" });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    thumbsUp = async (req: Request, res: Response) => {
        try {

            await this.articleObject.thumbsUp(req.body);
            return res.send({ status: "OK" });

        } catch (error) {
            console.log(error);
            const { statusCode, status, message } = handleErrors(error)
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

}



export const articleController = new ArticleController();