import createError, { HttpError } from "http-errors";
import express, { Response, Request, NextFunction } from "express";
import path from "path";
import "./config/mongo";
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });


import authorRouter from "./routes/authorRouter";
import articleRouter from "./routes/articleRouter";
import elasticSearchRouter from "./routes/elasticSearchRouter";
const app = express();



app.use(express.json());

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "jade");


app.use("/author", authorRouter);
app.use("/article", articleRouter);
app.use("/elasticSearch", elasticSearchRouter);


export default app;
