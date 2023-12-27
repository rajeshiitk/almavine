import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true); // https://mongoosejs.com/docs/guide.html#strict

  if (!process.env.MONGODB_URL) {
    return console.log("MONGODB_URL is not defined");
  }

  if (isConnected) {
    return console.log("Already connected to database"); // returning before console.log() because console.log() returns undefined
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "almavine",
    });

    isConnected = true;
    console.log("Connected to mongodb database");
  } catch (error) {
    console.log("Error connecting to mongodb database", error);
  }
};
