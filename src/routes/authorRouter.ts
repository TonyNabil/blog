import express from "express";
import { authorController } from "../controllers/authorController";
import { addAuthorValidator, getAuthorByIdValidator } from "../validators/authorValidators"

const router = express.Router();

//   POST /author
router.post("/addAuthor", addAuthorValidator, authorController.addAuthor);
//   GET /author
router.get("/getAllAuthors", authorController.getAllAuthors);
//   GET /author/:id
router.get("/getAuthorById", getAuthorByIdValidator, authorController.getAuthorById);

export default router;
