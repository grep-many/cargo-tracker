import { useState, useEffect } from "react";
import "./style.css";
import box from "@/assets/parcel_icon.png";
import NewShipmentForm from "../NewShipmentForm";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearch, setFilter } from "@/redux/slices/shipmentsSlice";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState("");
  const [localFilter, setLocalFilter] = useState("All");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { search, filter } = useSelector((state) => state.shipments);

  useEffect(() => {
    setLocalSearch(search);
    setLocalFilter(filter);
  }, [search, filter]);

  // Debounce search & filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      // Only update Redux + navigate if values changed
      if (localSearch !== search) {
        dispatch(setSearch(localSearch));
        navigate("/");
      }
      if (localFilter !== filter) {
        dispatch(setFilter(localFilter));
        navigate("/");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [localSearch, localFilter, search, filter, dispatch, navigate]);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>Movr</div>

      <input type="checkbox" id="menu-toggle" className="menu-toggle" />
      <label htmlFor="menu-toggle" className="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </label>

      <div className="nav-items">
        <div className="search-container">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search shipments..."
          />
        </div>

        <select
          value={localFilter}
          onChange={(e) => setLocalFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="pending">Pending</option>
          <option value="in-transit">In-Transit</option>
          <option value="delivered">Delivered</option>
          <option value="delayed">Delayed</option>
        </select>
      </div>

      <button className="new-shipment-btn" onClick={() => setIsModalOpen(true)}>
        <img src={box} alt="New Shipment" />
      </button>

      {isModalOpen && (
        <NewShipmentForm
          onClose={() => setIsModalOpen(false)}
          onSubmit={(data) => {
            console.log("✅ New shipment created:", data);
            setIsModalOpen(false);
          }}
        />
      )}
    </nav>
  );
};

export default Navbar;
