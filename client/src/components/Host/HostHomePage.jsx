import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './HostHomePage.css'; // External CSS for styling

const HostHomePage = () => {
    const navigate = useNavigate();
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [size, setSize] = useState('');
    const [vehicle, setVehicle] = useState('bike');
    const [handleWithCare, setHandleWithCare] = useState('no');

    const logout = () => {
        sessionStorage.removeItem('userInfo');
        navigate('/login');
    }

    useEffect(() => {
        const userInfo = sessionStorage.getItem('userInfo');
        if (!userInfo) navigate('/login');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add submission logic here
        console.log({ pickup, dropoff, size, vehicle, handleWithCare });
    }

    return (
        <div className="host-homepage">
            <div className="sidebar">
                <ul>
                    <li><button onClick={() => navigate('/dp-registration')}>DP Registration</button></li> {/* Navigate to DPRegistration */}
                    <li><button onClick={() => navigate('#orders-posted')}>Orders Posted</button></li>
                    <li><button onClick={() => navigate('#orders-completed')}>Orders Completed</button></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            </div>

            <div className="content">
                <h1>Delivery Information</h1>
                <form onSubmit={handleSubmit} className="delivery-form">
                    <div className="form-group">
                        <label htmlFor="pickup">Pickup Location:</label>
                        <input 
                            type="text" 
                            id="pickup" 
                            value={pickup} 
                            onChange={(e) => setPickup(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="dropoff">Drop-off Location:</label>
                        <input 
                            type="text" 
                            id="dropoff" 
                            value={dropoff} 
                            onChange={(e) => setDropoff(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="size">Product Size:</label>
                        <input 
                            type="text" 
                            id="size" 
                            value={size} 
                            onChange={(e) => setSize(e.target.value)} 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="vehicle">Preferred Vehicle:</label>
                        <select 
                            id="vehicle" 
                            value={vehicle} 
                            onChange={(e) => setVehicle(e.target.value)} 
                            required
                        >
                            <option value="bike">Bike</option>
                            <option value="car">Car</option>
                            <option value="truck">Truck</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Handle with Care:</label>
                        <div>
                            <label>
                                <input 
                                    type="radio" 
                                    value="yes" 
                                    checked={handleWithCare === 'yes'} 
                                    onChange={() => setHandleWithCare('yes')} 
                                />
                                Yes
                            </label>
                            <label>
                                <input 
                                    type="radio" 
                                    value="no" 
                                    checked={handleWithCare === 'no'} 
                                    onChange={() => setHandleWithCare('no')} 
                                />
                                No
                            </label>
                        </div>
                    </div>

                    <button type="submit">Submit Delivery</button>
                </form>
            </div>
        </div>
    );
}

export default HostHomePage;
