import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../docs/swagger.json";
import userRoutes from "../routes/userRoutes";

export default function appUse(app: express.Application): void {
  // Middlewares
  app.use(express.json());
  // Routes
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/api", userRoutes);
}
