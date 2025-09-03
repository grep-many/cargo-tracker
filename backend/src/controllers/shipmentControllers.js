import Shipment from "../models/shipments.js";

/**
 * @desc    Create a new shipment
 * @route   POST /api/shipments
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @property {String} containerId - Unique container ID
 * @property {String} origin - Shipment origin
 * @property {String} destination - Shipment destination
 * @property {Array} route - Array of route checkpoints
 * @property {String} currentLocation - Current location
 * @property {Date} eta - Estimated time of arrival
 * @property {String} status - Shipment status
 * @returns {Object} 201 - Created shipment object
 * @returns {Object} 400 - Error message
 */
export const createShipment = async (req, res) => {
    try {
        if (req.method === "POST") {

            const shipment = await Shipment.create(req.body);

            res.status(201).json({
                success: true,
                message: "Shipment created successfully",
                data: shipment,
            });
        } else {
            res.status(405).json({
                success: false,
                message: "Invalid HTTP method"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || "Failed to create shipment",
        });
    }
};

/**
 * @desc    Get all shipments
 * @route   GET /api/shipments
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @returns {Object} 200 - List of shipments
 * @returns {Object} 500 - Server error
 */
export const getAllShipments = async (req, res) => {
    try {
        if (req.method === "GET") {

            const shipments = await Shipment.find().sort({ createdAt: -1 });

            res.status(200).json({
                success: true,
                results: shipments.length,
                data: shipments,
            });
        } else {
            res.status(405).json({
                success: false,
                message: "Invalid HTTP method"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch shipments",
        });
    }
};

/**
 * @desc    Get a shipment by ID
 * @route   GET /api/shipment/:id
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {String} req.params.id - Shipment ID
 * @returns {Object} 200 - Shipment object
 * @returns {Object} 404 - Shipment not found
 * @returns {Object} 400 - Invalid shipment ID
 */
export const getShipmentById = async (req, res) => {
    try {
        if (req.method === "GET") {

            const shipment = await Shipment.findById(req.params.id);

            if (!shipment) {
                return res.status(404).json({
                    success: false,
                    message: "Shipment not found",
                });
            }

            res.status(200).json({
                success: true,
                data: shipment,
            });
        } else {
            res.status(405).json({
                success: false,
                message: "Invalid HTTP method"
            })
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid shipment ID",
        });
    }
};

/**
 * @desc    Update shipment status and/or current location
 * @route   POST /api/shipment/:id
 * @access  Public
 * @param   {Object} req - Express request object
 * @param   {Object} res - Express response object
 * @param   {String} req.params.id - Shipment ID
 * @property {String} status - Updated shipment status
 * @property {String} currentLocation - Updated current location
 * @returns {Object} 200 - Updated shipment
 * @returns {Object} 404 - Shipment not found
 * @returns {Object} 400 - Invalid request
 */
export const updateShipment = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        success: false,
        message: "Invalid HTTP method",
      });
    }

    const { status, currentLocation } = req.body;
    console.log(req.body)

    if (!status && !currentLocation) {
      return res.status(400).json({
        success: false,
        message: "Either 'status' or 'currentLocation' must be provided",
      });
    }

    const shipment = await Shipment.findByIdAndUpdate(
      req.params.id,
      { 
        ...(status && { status }),
        ...(currentLocation && { currentLocation }),
        lastUpdated: new Date(),
      },
      { new: true, runValidators: true }
    );

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Shipment updated successfully",
      data: shipment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || "Invalid shipment ID",
    });
  }
};

