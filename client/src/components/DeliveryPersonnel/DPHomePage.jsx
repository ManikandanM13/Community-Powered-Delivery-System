import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "./DPHomePage.css"; // Import the corresponding CSS file

const DPHomePage = () => {
  const navigate = useNavigate(); // Create a navigate instance
  const [dpName, setDpName] = useState(""); 
  const [text,settext]=useState("");
  // State for DP's name
  const [journey, setJourney] = useState({
    start: "",
    destination: "",
  });

  const [matchingDeliveries, setMatchingDeliveries] = useState([]);

  useEffect(() => {
    const dpInfo = sessionStorage.getItem("dpInfo");
    if (dpInfo) {
      const parsedInfo = JSON.parse(dpInfo);
      setDpName(parsedInfo.dpName); // Assuming dpInfo has a 'dpName' property
    } else {
      navigate("/login"); // Navigate to login if no dpInfo is found
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJourney({
      ...journey,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    settext("The map generation may take few minutes...");

    try {
      const response = await axios.post(
        "http://localhost:4000/api/matching-deliveries",
        journey
      );
      const location_url = response.data.location;
      window.open("http://localhost:4000/" + location_url, "_blank");
      console.log(location_url);
      setMatchingDeliveries(response.data.matchingDeliveries);
      alert("Journey submitted successfully");
    } catch (error) {
      console.error("Error fetching matching deliveries:", error);
      alert("Failed to fetch matching deliveries");
    }
  };

  const logout = () => {
    sessionStorage.removeItem("dpInfo"); // Remove dpInfo from session storage
    navigate("/host-homepage"); // Navigate to HostHomePage
  };

  return (
    <div className="dp-homepage">
      <div className="sidebar" style={{ backgroundColor: '#3c3c3c', padding: '15px', borderRadius: '8px' }}>
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
          <h3>{`Hello, ${dpName}`}</h3>
        </div>

        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><button onClick={() => navigate('/host-homepage')} style={{ color: '#fff' }}>Host Home</button></li>
          <li><button onClick={logout} style={{ color: '#fff' }}>Logout</button></li>
        </ul>
      </div>

      <div className="content">
        <h2>Delivery Personnel Journey</h2>
        <form onSubmit={handleSubmit} className="journey-form">
          <div className="form-group">
            <label htmlFor="start">Start Location:</label>
            <input
              type="text"
              id="start"
              name="start"
              value={journey.start}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={journey.destination}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Submit Journey</button>
          <p className="">{text}</p>
        </form>

        <ul>
          {matchingDeliveries.map((delivery) => (
            <li key={delivery._id}>
              {`Pickup: ${delivery.pickup}, Dropoff: ${delivery.dropoff}`}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
};

export default DPHomePage;
