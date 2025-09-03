import axiosInstance from "./axiosInstance";

/**
 * Fetch all shipments
 */
export const getAllShipments = () => axiosInstance.get("/shipments");

/**
 * Fetch a single shipment by ID
 */
export const getShipmentById = (id) => axiosInstance.get(`/shipment/${id}`);

/**
 * Create a new shipment
 */
export const createShipment = (shipmentData) => axiosInstance.post("/shipment", shipmentData);

/**
 * Update shipment (status and/or currentLocation)
 */
export const updateShipment = (id, updateData) => axiosInstance.post(`/shipment/${id}`, updateData);