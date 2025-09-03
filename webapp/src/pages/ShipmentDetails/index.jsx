import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ShipmentMap from "@/components/ShipmentMap";
import { editShipment, fetchShipments } from "@/redux/slices/shipmentsSlice";
import "./styles.css";

const ShipmentDetailsPage = () => {
  const { id } = useParams();
  const { shipments } = useSelector((state) => state.shipments);
  const dispatch = useDispatch();

  const [shipment, setShipment] = useState(null);
  const [newLocation, setNewLocation] = useState("");
  const [status, setStatus] = useState("");

  // Load shipment details
  useEffect(() => {
    if (shipments.length === 0) {
      dispatch(fetchShipments());
    } else {
      const found = shipments.find((s) => s._id === id);
      setShipment(found);
      if (found) {
        setNewLocation(found.currentLocation);
        setStatus(found.status);
      }
    }
  }, [id, shipments, dispatch]);

  if (!shipment) return <div className="loading">Loading shipment details...</div>;

  const handleUpdate = (field, value) => {
    // Update local state
    if (field === "location") setNewLocation(value);
    if (field === "status") setStatus(value);

    // Dispatch editShipment to update backend
    dispatch(
      editShipment({
        id: shipment._id,
        updateData: {
          currentLocation: field === "location" ? value : newLocation,
          status: field === "status" ? value : status,
        },
      })
    );

    // Immediate UI feedback
    setShipment({
      ...shipment,
      currentLocation: field === "location" ? value : newLocation,
      status: field === "status" ? value : status,
    });
  };

  return (
    <div className="card-container">
      <div className="card-content">
        {/* Map Section */}
        <div className="map-card">
          <ShipmentMap
            origin={shipment.origin}
            destination={shipment.destination}
            route={shipment.route}
            currentLocation={newLocation}
          />
        </div>

        {/* Details Section */}
        <div className="details-card">
          <h2>Container: {shipment.containerId}</h2>
          <ul>
            <li><strong>Shipment ID:</strong> {shipment.shipmentId}</li>
            <li><strong>Origin:</strong> {shipment.origin}</li>
            <li><strong>Destination:</strong> {shipment.destination}</li>
            <li>
              <strong>Current Location:</strong>
              <select
                className="dropdown"
                value={newLocation}
                onChange={(e) => handleUpdate("location", e.target.value)}
              >
                {shipment.route.map((loc, idx) => (
                  <option key={idx} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </li>
            <li>
              <strong>Status:</strong>
              <select
                className="dropdown"
                value={status}
                onChange={(e) => handleUpdate("status", e.target.value)}
              >
                <option value="pending">Pending</option>
                <option value="in-transit">In-Transit</option>
                <option value="delivered">Delivered</option>
                <option value="delayed">Delayed</option>
              </select>
            </li>
            <li><strong>ETA:</strong> {new Date(shipment.currentETA).toLocaleString()}</li>
            <li><strong>Weight:</strong> {shipment.weight} kg</li>
            <li><strong>Last Updated:</strong> {new Date(shipment.lastUpdated).toLocaleString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ShipmentDetailsPage;
