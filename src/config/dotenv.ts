require("dotenv").config();

const config = {
  db: {
    uri() {
      if (!process.env.MONGODB_URI) {
        throw new Error("Please input MONGODB_URI in .env file");
      }
      return process.env.MONGODB_URI;
    },
  },

  server: {
    port() {
      if (!process.env.PORT) {
        throw new Error("Please input PORT in .env file");
      }
      return process.env.PORT;
    },
    jwtSecret() {
      if (!process.env.JWT_SECRET) {
        throw new Error("Please input JWT_SECRET in .env file");
      }
      return process.env.JWT_SECRET;
    },
    expiresIn() {
      if (!process.env.EXPIRES_IN) {
        throw new Error("Please input EXPIRES_IN in .env file");
      }
      return process.env.EXPIRES_IN;
    },
  },
};

export default config;
