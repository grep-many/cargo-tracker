import mongoose from "mongoose";

/**
 * Establishes a connection to MongoDB using Mongoose.
 * Exits the process if the connection fails.
 */
const connectDB = async () => {
  try {
    // Optional: recommended for Mongoose 7+
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // Event listeners for connection state
    mongoose.connection.on("disconnected", () => {
      console.warn("⚠️ MongoDB disconnected!");
    });

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB connection error:", err);
    });
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1); // Stop the app if DB fails
  }
};

export default connectDB;
