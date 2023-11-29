import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import app from "./app.js";
import {
  generalError,
  notFound,
} from "./middlewares/errors/errorsMiddleware.js";
import pingRouter from "../features/ping/router/pingRouter.js";
import shoesRouter from "../features/shoe/router/shoesRouter.js";

const port = process.env.PORT ?? 4000;
const frontUrl = process.env.FRONT_URL!;

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: [frontUrl, `http://localhost:${port}`],
  }),
);

app.use("/shoes", shoesRouter);

app.use("/", pingRouter);

app.use(notFound);

app.use(generalError);
