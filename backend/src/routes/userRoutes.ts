import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client"; 
import { authMiddleware } from "../authmiddleware.js";

const router = Router();
const prisma = new PrismaClient(); 

router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, username, email, password: hashedPassword },
    });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600000,
    });

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true, 
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", 
      maxAge: 3600000, 
    });

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.get("/profile", authMiddleware, async (req: any, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

export default router ;
