import { Request, Response } from 'express';
import UserService from '../services/userService';

const userService = new UserService();

const createUser = async (req: Request, res: Response) => {
  try {
    const { username, password, fullname } = req.body;
    const user = await userService.createUser({ username, password, fullname });
    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await userService.loginUser(username, password);
    if (!token) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default {
  createUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};









// import { Request, Response } from "express";
// import User, { IUser } from "../models/User";
// import jwt from "jsonwebtoken";

// const createUser = async (req: Request, res: Response) => {
//   try {
//     const { username, password, fullname } = req.body;
//     const user = new User({
//       username,
//       password,
//       fullname,
//       posts: 0,
//       refresh_token: "",
//     });
//     await user.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const loginUser = async (req: Request, res: Response) => {
//   try {
//     const { username, password } = req.body;
//     const user = await User.findOne({ username });
//     if (!user || user.password !== password) {
//       res.status(401).json({ error: "Invalid credentials" });
//       return;
//     }

//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "", {
//       expiresIn: "1h",
//     });
//     user.refresh_token = token;
//     await user.save();

//     res.status(200).json({ token });
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const getUserById = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const updateUser = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//     });
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//       return;
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);
//     if (!user) {
//       res.status(404).json({ error: "User not found" });
//       return;
//     }
//     res.status(204).end();
//   } catch (error) {
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

// export default {
//   createUser,
//   loginUser,
//   getUsers,
//   getUserById,
//   updateUser,
//   deleteUser,
// };
