// ShipmentMap.jsx
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./styles.css";

const ShipmentMap = ({ origin, destination, route, currentLocation }) => {
  useEffect(() => {
    // Initialize map only once
    const map = L.map("map", {
      zoomControl: true,
      attributionControl: true,
    }).setView([20, 0], 3);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    }).addTo(map);

    // Custom Truck Marker Icon
    const truckIcon = L.divIcon({
      className: "truck-icon",
      html: "🚚",
      iconSize: [50, 50],
      iconAnchor: [25, 25],
    });

    // Geocode helper
    const geocode = async (place) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${place}`
      );
      const data = await res.json();
      return data.length > 0 ? [parseFloat(data[0].lat), parseFloat(data[0].lon)] : null;
    };

    const loadLocations = async () => {
      const locations = [origin, ...route, destination];
      const points = [];

      for (let loc of locations) {
        const coords = await geocode(loc);
        if (coords) {
          points.push(coords);

          // Mark stops with pin markers
          L.marker(coords).addTo(map).bindPopup(`<b>Stop:</b> ${loc}`);
        }
      }

      // Draw route line
      if (points.length > 1) {
        L.polyline(points, { color: "blue", weight: 4 }).addTo(map);
        map.fitBounds(points);
      }

      // Highlight current truck location
      if (currentLocation) {
        const currentCoords = await geocode(currentLocation);
        if (currentCoords) {
          L.marker(currentCoords, { icon: truckIcon })
            .addTo(map)
            .bindPopup(`<b>Current Location:</b> ${currentLocation}`)
            .openPopup();
        }
      }
    };

    loadLocations();

    return () => map.remove();
  }, [origin, destination, route, currentLocation]);

  return <div id="map" className="map"></div>;
};

export default ShipmentMap;
