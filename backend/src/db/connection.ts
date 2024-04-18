import { connect, disconnect } from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

async function connectToDatabase() {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
    throw new Error("Could not connect to MongoDB");
  }
}

async function disconnectFromDatabase() {
  try {
    await disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error(error);
    throw new Error("Could not disconnect from MongoDB");
  }
}

export { connectToDatabase, disconnectFromDatabase };
