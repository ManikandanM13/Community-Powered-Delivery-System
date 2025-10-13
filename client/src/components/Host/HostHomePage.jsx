import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import './HostHomePage.css'; // External CSS for styling

const HostHomePage = () => {
    const navigate = useNavigate();
    
    // New fields for host details
    const [hostName, setHostName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    
    const [pickup, setPickup] = useState('');
    const [dropoff, setDropoff] = useState('');
    const [size, setSize] = useState('');
    const [vehicle, setVehicle] = useState('bike');
    const [handleWithCare, setHandleWithCare] = useState('no');

    const logout = () => {
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('dpInfo');
        navigate('/login');
    }

    useEffect(() => {
        const userInfo = sessionStorage.getItem('userInfo');
        if (!userInfo) navigate('/login');
        else {
            const { name, email } = JSON.parse(userInfo);
            setHostName(name); // Set hostName to the user's name
            setContactNumber(email); // Optionally set the contact number to email or store separately
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            hostName,
            contactNumber,
            pickup,
            dropoff,
            size,
            vehicle,
            handleWithCare
        };

        try {
            // POST the data to the backend
            const response = await axios.post('http://localhost:4000/api/orders/add-order', orderData);
            alert(response.data.message);
            // Optionally, you can reset the form here or navigate to another page
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('Failed to submit the order. Please try again.');
        }
    };

    return (
        <div className="host-homepage">
            <div className="sidebar">
                {/* User Info Card */}
                <div style={{
                    background: 'linear-gradient(135deg, #6d5f8e, #a9a8f2)',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center',
                    overflow: "hidden",
                }}>
                    <h3>{hostName}</h3>
                    <p>{contactNumber}</p>
                </div>

                <ul style={{ listStyleType: 'none', padding: 0 }}>
    <li><button onClick={() => navigate('/dp-registration')} style={{ color: '#fff' }}>DP Reg/Login</button></li>
    
    
    {sessionStorage.getItem('dpInfo') && (
        <li><button onClick={() => navigate('/dp-home')} style={{ color: '#fff' }}>DP Home</button></li>
    )}
    
    <li><button onClick={() => navigate('/orders-posted')} style={{ color: '#fff' }}>Orders Posted</button></li>

    <li><button onClick={logout} style={{ color: '#fff' }}>Logout</button></li>
</ul>

            </div>

            <div className="content">
                <h1>Delivery Information</h1>
                <form onSubmit={handleSubmit} className="delivery-form">

                    {/* Host Name Field */}
                    <div className="form-group">
                        <label htmlFor="hostName">Host Name:</label>
                        <input 
                            type="text" 
                            id="hostName" 
                            value={hostName} 
                            onChange={(e) => setHostName(e.target.value)} 
                            required 
                        />
                    </div>

                    {/* Contact Number Field */}
                    <div className="form-group">
                        <label htmlFor="contactNumber">Email-id:</label>
                        <input 
                            type="tel" 
                            id="contactNumber" 
                            value={contactNumber} 
                            onChange={(e) => setContactNumber(e.target.value)} 
                            required 
                        />
                    </div>

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
                           <div className="radio-group">
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
