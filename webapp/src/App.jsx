import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShipmentsPage from "./pages/Shipments";
import ShipmentDetailsPage from "./pages/ShipmentDetails";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<ShipmentsPage />} />
                <Route path="/:id" element={<ShipmentDetailsPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
