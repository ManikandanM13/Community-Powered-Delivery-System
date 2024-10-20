import { Navigate, Route, Routes } from "react-router-dom";
import HostLogin from "./components/Host/HostLogin";
import HostRegistration from "./components/Host/HostRegistration";
import HostHomePage from "./components/Host/HostHomePage";
import DPRegistration from "./components/DeliveryPersonnel/DPRegistration";
import DPHomePage from "./components/DeliveryPersonnel/DPHomePage";
import DPLogin from "./components/DeliveryPersonnel/DPLogin"; // Import DPLogin

function App() {
    return (
        <Routes>
            <Route path="/login" element={<HostLogin />} />
            <Route path="/register" element={<HostRegistration />} />
            <Route path="/home" element={<HostHomePage />} />
            <Route path="/dp-registration" element={<DPRegistration />} />
            <Route path="/dp-home" element={<DPHomePage />} />
            <Route path="/dp-login" element={<DPLogin />} /> {/* Add DPLogin route */}
            <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
    );
}

export default App;
