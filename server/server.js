import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

// load .env
dotenv.config();

// initialize express
const app = express();

// db connection
await connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res, next) => {
  res.send("api working");
});
app.use("/api/users", userRoutes);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
