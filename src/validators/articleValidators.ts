const joi = require("joi");
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);


export const addArticleValidator = function (req, res, next) {
    try {

        const bodySchema = {
            title: joi.string().required(),
            body: joi.string().required(),
            author: ObjectId().required()
        };

        const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: false });
        const validationError = bodyValidation.error;

        if (validationError) {
            return res.status(400).send({
                status: "BAD_REQUEST",
                message: validationError.message
            });
        }

        return next();
    } catch (error) {
        console.error("validators --> addArticleValidator.ts ", error);
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error!"
        });
    }
};

export const getArticleByIdValidator = (req, res, next) => {

    try {
        // validation schema for the request query
        const requestQuerySchema = joi.object().keys({
            id: ObjectId().required()
        });

        const requestQueryValidation = requestQuerySchema.validate(req.query, { allowUnknown: false, abortEarly: false });

        const validationError = requestQueryValidation.error;

        if (validationError) {
            return res.status(400).send({
                status: "BAD_REQUEST",
                message: validationError.message
            });
        }

        next();

    } catch (error) {
        console.error("validators --> getArticleByIdValidator.js , res, next)", error);
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error!"
        });
    }

};

export const searchForArticleValidator = function (req, res, next) {
    try {

        const bodySchema = {
            query: joi.string().required()
        };

        const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: false });
        const validationError = bodyValidation.error;

        if (validationError) {
            return res.status(400).send({
                status: "BAD_REQUEST",
                message: validationError.message
            });
        }

        return next();
    } catch (error) {
        console.error("validators --> searchForArticleValidator.ts ", error);
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error!"
        });
    }
};

export const addCommentToArticleValidator = function (req, res, next) {
    try {

        const bodySchema = {
            articleId: ObjectId().required(),
            authorId: ObjectId().required(),
            body: joi.string().required()
        };

        const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: false });
        const validationError = bodyValidation.error;

        if (validationError) {
            return res.status(400).send({
                status: "BAD_REQUEST",
                message: validationError.message
            });
        }

        return next();
    } catch (error) {
        console.error("validators --> addCommentToArticleValidator.ts ", error);
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error!"
        });
    }
};

export const thumbsUpValidator = function (req, res, next) {
    try {

        const bodySchema = {
            articleId: ObjectId().required(),
            authorId: ObjectId().required()
        };

        const bodyValidation = joi.validate(req.body, bodySchema, { allowUnknown: false });
        const validationError = bodyValidation.error;

        if (validationError) {
            return res.status(400).send({
                status: "BAD_REQUEST",
                message: validationError.message
            });
        }

        return next();
    } catch (error) {
        console.error("validators --> addCommentToArticleValidator.ts ", error);
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error!"
        });
    }
};

