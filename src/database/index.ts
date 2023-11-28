import mongoose from "mongoose";
import chalk from "chalk";
import debugCreator from "debug";

const debug = debugCreator("shoes:database:connectToDatabase");

export const connectToDatabase = async (mongoUrl: string) => {
  try {
    await mongoose.connect(mongoUrl);
    mongoose.set("debug", true);
    debug(chalk.green("Connected to database!"));
  } catch (error) {
    debug(
      chalk.red(`Error connecting to database: ${(error as Error).message} `),
    );
  }
};
