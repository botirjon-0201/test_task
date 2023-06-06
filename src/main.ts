import express from "express";
import config from "./config/dotenv";
import database from "./start/database";
import appUse from "./start/app";

// Start the server
async function start() {
  try {
    const app = express();
    appUse(app);
    database();

    const PORT = config.server.port() || 5000;
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}
start();
