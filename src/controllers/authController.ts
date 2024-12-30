import UserModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import express from "express";
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { name, email, password, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: "Internal server error" });
  }
};
