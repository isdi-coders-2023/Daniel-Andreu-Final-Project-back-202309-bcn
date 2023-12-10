import mongoose from "mongoose";
import "./server/index.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import { connectToDatabase } from "./database/index.js";

export let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const mongoDbUrl = server.getUri();
  await connectToDatabase(mongoDbUrl);
});

afterAll(async () => {
  await mongoose.disconnect();
  await server.stop();
});
