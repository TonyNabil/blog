import { Response, Request } from "express";
import elasticSearchService from "../services/elasticSearchService";

class ElasticSearchController {

    private elasticSearchObject: elasticSearchService;

    constructor() {
        this.elasticSearchObject = new elasticSearchService();
    }


    search = async (req: Request, res: Response) => {
        try {

            let query = req.body.query === "ALL" ? "" : req.body.query;
            query = query ? query : "";

            const result = await this.elasticSearchObject.search(query);
            return res.send({ status: "SUCCESS", ...result });

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



export const elasticSearchController = new ElasticSearchController();