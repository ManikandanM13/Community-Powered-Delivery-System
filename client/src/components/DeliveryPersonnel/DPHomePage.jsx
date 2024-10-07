import React, { useState } from 'react';
import './DPHomePage.css'; // Ensure you create this CSS file for styling

const DPHomePage = () => {
    const [journey, setJourney] = useState({
        start: '',
        destination: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJourney({
            ...journey,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle journey submission logic here, e.g., save to backend
        console.log('Journey Details:', journey);
        alert('Journey submitted successfully');
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
        </div>
    );
};

export default DPHomePage;
