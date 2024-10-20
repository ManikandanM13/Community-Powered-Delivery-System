import React, { useState } from 'react';
import axios from 'axios';
import './DPHomePage.css';

const DPHomePage = () => {
    const [journey, setJourney] = useState({
        start: '',
        destination: ''
    });

    const [matchingDeliveries, setMatchingDeliveries] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJourney({
            ...journey,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/api/matching-deliveries', journey);
            setMatchingDeliveries(response.data.matchingDeliveries);
            alert('Journey submitted successfully');
        } catch (error) {
            console.error('Error fetching matching deliveries:', error);
            alert('Failed to fetch matching deliveries');
        }
    };

    return (
        <div className="dp-homepage">
            <h2>Delivery Personnel Journey</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="start">Start Location:</label>
                <input
                    type="text"
                    id="start"
                    name="start"
                    value={journey.start}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="destination">Destination:</label>
                <input
                    type="text"
                    id="destination"
                    name="destination"
                    value={journey.destination}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Submit Journey</button>
            </form>

            <h3>Matching Deliveries</h3>
            <ul>
                {matchingDeliveries.map(delivery => (
                    <li key={delivery._id}>{`Pickup: ${delivery.pickup}, Dropoff: ${delivery.dropoff}`}</li>
                ))}
            </ul>
        </div>
    );
};

export default DPHomePage;
