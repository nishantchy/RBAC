// index.ts
import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";
dotenv.config();
dbConnect();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to my RBAC application!");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
