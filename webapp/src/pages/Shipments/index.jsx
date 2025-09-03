import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShipments } from "../../redux/slices/shipmentsSlice";
import { setSearch, setFilter } from "../../redux/slices/shipmentsSlice";
import "./styles.css";
import { useNavigate } from "react-router-dom";

const ShipmentsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shipments, loading, error, search, filter } = useSelector(
    (state) => state.shipments
  );

  const [filteredShipments, setFilteredShipments] = useState([]);

  // Fetch shipments
  useEffect(() => {
    dispatch(fetchShipments());
  }, [dispatch]);

  // Filter shipments whenever shipments, search, or filter change
  useEffect(() => {
    if (!shipments) return;

    let filtered = shipments;

    // Filter by status
    if (filter !== "All") {
      filtered = filtered.filter(
        (s) => s.status.toLowerCase() === filter.toLowerCase()
      );
    }

    // Search by multiple fields including dates
    if (search.trim() !== "") {
      filtered = filtered.filter((s) =>
        [
          s.shipmentId,
          s.containerId,
          s.origin,
          s.destination,
          s.currentLocation,
          s.status,
          new Date(s.currentETA).toLocaleString(),
          new Date(s.lastUpdated).toLocaleString(),
        ].some((val) =>
          val.toString().toLowerCase().includes(search.toLowerCase())
        )
      );
    }

    setFilteredShipments(filtered);
  }, [shipments, search, filter]);

  if (loading) return <div className="loading">Loading shipments...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  // Determine table title
  const tableTitle =
    search.trim() !== "" || filter !== "All" ? "Results" : "All Shipments";

  return (
    <div className="container">
      <h1>{tableTitle}</h1>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Container ID</th>
              <th>Origin</th>
              <th>Destination</th>
              <th>Current Location</th>
              <th>ETA</th>
              <th>Weight</th>
              <th>Last Updated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.length > 0 ? (
              filteredShipments.map((s, idx) => (
                <tr
                  key={s._id}
                  className={`row-${idx % 2 === 0 ? "even" : "odd"}`}
                  onClick={() => navigate(`/${s._id}`)}
                >
                  <td data-label="Container ID">{s.containerId}</td>
                  <td data-label="Origin">{s.origin}</td>
                  <td data-label="Destination">{s.destination}</td>
                  <td data-label="Current Location">{s.currentLocation}</td>
                  <td data-label="ETA">{new Date(s.currentETA).toLocaleString()}</td>
                  <td data-label="Weight">{s.weight}kg</td>
                  <td data-label="Last Updated">{new Date(s.lastUpdated).toLocaleString()}</td>
                  <td
                    data-label="Status"
                    className={`status-${s.status.replace(" ", "-")}`}
                  >
                    {s.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" style={{ textAlign: "center", padding: "1rem" }}>
                  No shipments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentsPage;
