import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";

// Initialize express
const app = express();

// Coonect to db
await connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res, next) => {
  res.send("api working");
});

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
