import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

// Fix __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Auth routes - create routes/auth.js first
import authRouter from "./routes/auth.js";
app.use("/api/auth", authRouter);

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ FIXED: Express 5 wildcard syntax - use regex instead of "*"
app.get(/(.*)/, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Auth endpoints: POST /api/auth/register, POST /api/auth/login`);
});
