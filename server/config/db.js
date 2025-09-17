import mongoose from "mongoose";

// MongoDB connection
const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("Database connected");
  });
  mongoose.connect(`${process.env.MONGODB_URI}`);
};

export default connectDB;
