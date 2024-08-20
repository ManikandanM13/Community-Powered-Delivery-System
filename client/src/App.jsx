import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HostLogin from './components/Host/HostLogin';
import HostRegistration from './components/Host/HostRegistration';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<HostLogin />} />
                <Route path="/register" element={<HostRegistration />} />
            </Routes>
        </Router>
    );
}

export default App;
