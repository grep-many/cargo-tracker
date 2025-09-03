import express from "express";
import {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipment,
} from "../controllers/shipmentControllers.js";

const router = express.Router();

// Create a new shipment
router.post("/shipment", createShipment);

// Get all shipments
router.get("/shipments", getAllShipments);

// Get shipment by ID
router.get("/shipment/:id", getShipmentById);

// Update shipment status and/or current location
router.post("/shipment/:id", updateShipment);

export default router;
