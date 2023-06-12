import express from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const userRouter = express.Router();
const userController = new UserController();

// Public routes
userRouter.post("/", userController.createUser);
userRouter.post("/login", userController.loginUser);

// Protected routes
userRouter.get("/", authMiddleware, userController.getUsers);
userRouter.get("/:id", authMiddleware, userController.getUserById);
userRouter.put("/:id", authMiddleware, userController.updateUser);
userRouter.delete("/:id", authMiddleware, userController.deleteUser);

export default userRouter;
