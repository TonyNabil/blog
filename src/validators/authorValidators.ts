const joi = require("joi");
const joiObjectId = require("joi-objectid")
const ObjectId = joiObjectId(joi);


export const addAuthorValidator = function (req, res, next) {
    try {

        const bodySchema = {
            name: joi.string().required(),
            job: joi.string().required()
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
        console.error("validators --> addAuthorValidator.ts ", error);
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error!"
        });
    }
};

export const getAuthorByIdValidator = (req, res, next) => {

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
        console.error("validators --> getAuthorByIdValidator.js , res, next)", error);
        return res.status(500).json({
            status: "SERVER_ERROR",
            message: "Internal Server Error!"
        });
    }

};

