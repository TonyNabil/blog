import express from "express";
import { authorController } from "../controllers/authorController";
import { addAuthorValidator, getAuthorByIdValidator } from "../validators/authorValidators"

const router = express.Router();

router.post("/addAuthor", addAuthorValidator, authorController.addAuthor);
router.get("/getAllAuthors", authorController.getAllAuthors);
router.get("/getAuthorById", getAuthorByIdValidator, authorController.getAuthorById);

export default router;
