import { Navigate, Route, Routes } from "react-router-dom";
import HostLogin from "./components/Host/HostLogin";
import HostRegistration from "./components/Host/HostRegistration";
import HostHomePage from "./components/Host/HostHomePage";

function App() {
    return (
        <Routes>
            <Route path="/login" element={<HostLogin />} />
            <Route path="/register" element={<HostRegistration />} />
            <Route path="/home" element={<HostHomePage />} />
            <Route path="*" element={<Navigate to="/register" />} />
        </Routes>
    );
}

export default App;
