import mongoose, { ConnectOptions } from "mongoose";
import config from "../config/dotenv";

const db = () =>
  mongoose
    .connect(config.db.uri() || "mongodb://localhost:27017/test_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    .then(() => console.log("Connected to MongDB.."))
    .catch((error) => console.error("Error connecting to MongDB...", error));

export default db;
