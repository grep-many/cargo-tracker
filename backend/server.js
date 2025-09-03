import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import shipmentRoutes from "./src/routes/shipmentRoutes.js";
import { errorHandler } from "./src/middleware/errorHandling.js";
import cors from "cors"

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors())

// Connect to MongoDB before starting the server
const startServer = async () => {
    try {
        await connectDB();

        // Health check route
        app.use("/", shipmentRoutes);
        app.use(errorHandler)

        // 404 handler for unmatched routes
        app.use((req, res) => {
            res.status(404).json({ success: false, message: "Route not found" });
        });

        // Global error handler

        app.use((err, req, res, next) => {
            // Log full error in development
            if (process.env.NODE_ENV === "development") {
                console.error(err.stack);
                return res.status(err.status || 500).json({
                    success: false,
                    message: err.message,
                    stack: err.stack
                });
            }
            // Only generic message in production
            res.status(err.status || 500).json({
                success: false,
                message: "Server Error",
            });
        });

        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(
                `🚀 Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`
            );
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();