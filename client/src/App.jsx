import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostLogin from './components/Host/HostLogin';
import HostRegistration from './components/Host/HostRegistration';
import HostHomePage from './components/Host/HostHomePage';


function App() {
    return (
        
            <Routes>
                <Route path="/login" element={<HostLogin />} />
                <Route path="/register" element={<HostRegistration />} />
                <Route path="/hosthomepage" element={<HostHomePage />} />
            </Routes>
    
    );
}

export default App;
