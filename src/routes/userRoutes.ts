import express from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = express.Router();

// Public routes
router.post("/users", UserController.createUser);
router.post("/users/login", UserController.loginUser);

// Protected routes
router.get("/users", authMiddleware, UserController.getUsers);
router.get("/users/:id", authMiddleware, UserController.getUserById);
router.put("/users/:id", authMiddleware, UserController.updateUser);
router.delete("/users/:id", authMiddleware, UserController.deleteUser);

export default router;
