import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import app from "./app.js";
import {
  generalError,
  notFound,
} from "./middlewares/errors/errorsMiddleware.js";

const port = process.env.PORT ?? 4000;
const frontUrl = process.env.FRONT_URL!;

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: [frontUrl, `http://localhost:${port}`],
  }),
);

app.use(notFound);

app.use(generalError);
