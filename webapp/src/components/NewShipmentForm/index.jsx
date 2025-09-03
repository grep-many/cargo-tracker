import { useState } from "react";
import { useDispatch } from "react-redux";
import { addShipment } from "@/redux/slices/shipmentsSlice"; // ✅ use addShipment, not createShipment
import "./styles.css";

const NewShipmentForm = ({ onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    containerId: "",
    origin: "",
    destination: "",
    route: "",
    currentLocation: "",
    currentETA: "",
    status: "",
    weight: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const shipmentData = {
      ...formData,
      route: formData.route.split(",").map((r) => r.trim()),
    };

    // ✅ Dispatch the thunk correctly
    dispatch(addShipment(shipmentData));

    // ✅ Close modal after submission
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Shipment</h2>
        <form onSubmit={handleSubmit} className="shipment-form">
          <label>
            Container ID
            <input
              type="text"
              name="containerId"
              value={formData.containerId}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Origin
            <input
              type="text"
              name="origin"
              value={formData.origin}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Destination
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Route (comma separated)
            <input
              type="text"
              name="route"
              value={formData.route}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Current Location
            <input
              type="text"
              name="currentLocation"
              value={formData.currentLocation}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            ETA
            <input
              type="datetime-local"
              name="currentETA"
              value={formData.currentETA}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Status
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="pending">Pending</option>
              <option value="in-transit">In-Transit</option>
              <option value="delivered">Delivered</option>
              <option value="delayed">Delayed</option>
            </select>
          </label>

          <label>
            Weight (kg)
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
            />
          </label>

          <div className="modal-actions">
            <button type="submit" className="btn primary">
              Create
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewShipmentForm;
