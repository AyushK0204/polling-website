import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import pollRoutes from "./routes/pollRoutes.js";

// load .env
dotenv.config();

// initialize express
const app = express();

// db connection
await connectDB();

const corsOptions = {
  origin: process.env.CORS_ORIGIN,
  credentials: true,
};

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// routes
app.get("/", (req, res, next) => {
  res.send("api working");
});

app.use("/api/users", userRoutes);
app.use("/api/polls", pollRoutes);

// port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});

export default app;
