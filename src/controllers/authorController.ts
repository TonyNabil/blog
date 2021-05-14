import { Response, Request } from "express";
import AuthorsService from "../services/authorService";

class AuthorsController {

    private authourObject: AuthorsService;

    constructor() {
        this.authourObject = new AuthorsService();
    }

    addAuthor = async (req: Request, res: Response) => {
        try {
            await this.authourObject.addAuthor(req.body);
            return res.send({ status: "OK" });

        } catch (error) {
            console.log(error);
            const statusCode = error.statusCode ? error.statusCode : 500
            const status = error.status ? error.status : "SERVER_ERROR"
            const message = error.message ? error.message : "Internal Server Error!"
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    getAllAuthors = async (req: Request, res: Response) => {
        try {
            const result = await this.authourObject.getAllAuthors();
            return res.send({ status: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const statusCode = error.statusCode ? error.statusCode : 500
            const status = error.status ? error.status : "SERVER_ERROR"
            const message = error.message ? error.message : "Internal Server Error!"
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }

    getAuthorById = async (req: Request, res: Response) => {
        try {

            const result = await this.authourObject.getAuthorById(req.query.id);
            return res.send({ status: "SUCCESS", result });

        } catch (error) {
            console.log(error);
            const statusCode = error.statusCode ? error.statusCode : 500
            const status = error.status ? error.status : "SERVER_ERROR"
            const message = error.message ? error.message : "Internal Server Error!"
            return res.status(statusCode).json({
                status: status,
                message: message
            });
        }
    }


}



export const authorController = new AuthorsController();