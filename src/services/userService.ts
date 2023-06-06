import User, { IUser } from "../models/User";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

class UserService {
  async createUser(userData: any): Promise<IUser> {
    try {
      const { username, password, fullname } = userData;
      const hashed_password = await hash(password, 10);
      const user = new User({
        username,
        password: hashed_password,
        fullname,
        posts: 0,
        refresh_token: "",
      });
      await user.save();
      return user;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw new Error("Failed to create user");
    }
  }

  async loginUser(username: string, password: string): Promise<string | null> {
    try {
      const user = await User.findOne({ username });
      if (!user || !(await compare(password, user.password))) {
        return null;
      }
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "1h",
        }
      );
      user.refresh_token = token;
      await user.save();
      return token;
    } catch (error) {
      throw new Error("Failed to login");
    }
  }

  async getUsers(): Promise<IUser[]> {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw new Error("Failed to retrieve users");
    }
  }

  async getUserById(id: string): Promise<IUser | null> {
    try {
      const user = await User.findById(id);
      return user;
    } catch (error) {
      throw new Error("Failed to retrieve user");
    }
  }

  async updateUser(
    id: string,
    updatedData: Partial<IUser>
  ): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndUpdate(id, updatedData, { new: true });
      return user;
    } catch (error) {
      throw new Error("Failed to update user");
    }
  }

  async deleteUser(id: string): Promise<IUser | null> {
    try {
      const user = await User.findByIdAndDelete(id);
      return user;
    } catch (error) {
      throw new Error("Failed to delete user");
    }
  }
}

export default UserService;
