import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import app from "./app.js";

app.use(morgan("dev"));

app.use(express.json());

app.use(
  cors({
    origin: [
      "https://daniel-andreu-202309-bcn-front.netlify.app/",
      "http://localhost:4000",
    ],
  }),
);
