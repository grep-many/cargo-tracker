import mongoose from "mongoose";

const shipmentSchema = new mongoose.Schema(
    {
        shipmentId: {
            type: mongoose.Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
            unique: true,
            index: true,
        },
        containerId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            index: true,
        },
        origin: {
            type: String,
            required: true,
            trim: true,
        },
        destination: {
            type: String,
            required: true,
            trim: true,
        },
        route: {
            type: [String], // array of location names
            required: true,
            validate: {
                validator: (v) => Array.isArray(v) && v.length > 0,
                message: "Route must have at least one location",
            },
        },
        currentLocation: {
            type: String,
            required: true,
            trim: true,
        },
        currentETA: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "in-transit", "delivered", "delayed"],
            default: "pending",
            index: true,
        },
        weight: {
            type: Number,
            min: 0,
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

// Middleware: update lastUpdated before save
shipmentSchema.pre("save", function (next) {
    this.lastUpdated = new Date();
    next();
});

const Shipment = mongoose.models.Shipment || mongoose.model("Shipment", shipmentSchema);

export default Shipment;
