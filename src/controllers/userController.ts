import { Request, Response } from "express";
import UserService from "../services/userService";

const userService = new UserService();

class UserController {
  createUser = async (req: Request, res: Response) => {
    try {
      const { username, password, fullname } = req.body;
      const user = await userService.createUser({
        username,
        password,
        fullname,
      });
      res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  loginUser = async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      const token = await userService.loginUser(username, password);
      if (!token) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getUsers = async (req: Request, res: Response) => {
    try {
      const users = await userService.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    try {
      const user = await userService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    try {
      const user = await userService.deleteUser(req.params.id);
      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default UserController;
