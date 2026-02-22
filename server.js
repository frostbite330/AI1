require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const db = require("./db"); // initialize database
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 🔥 Serve static files from public folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/auth", authRoutes);

// 🔥 Fallback route (for frontend routing if needed)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});