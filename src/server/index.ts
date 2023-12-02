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

const frontUrl = process.env.FRONT_URL!;

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: [frontUrl, "http://localhost:5173", "http://localhost:4000"],
  }),
);

app.use("/shoes", shoesRouter);

app.use("/", pingRouter);

app.use(notFound);

app.use(generalError);
