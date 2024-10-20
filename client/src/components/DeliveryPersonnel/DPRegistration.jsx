import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./DPRegistration.css"; // External CSS file for styling

const DPRegistration = () => {
  const [formData, setFormData] = useState({
    dlNumber: "",
    rcNumber: "",
    dlProof: "", // Local state for DL Proof (not sent to the server)
    rcProof: "", // Local state for RC Proof (not sent to the server)
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/dpregister",
        {
          DLNumber: formData.dlNumber,
          RCNumber: formData.rcNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      alert(response.data.message);
      if (response.data.message === "DP Registration successful") {
        navigate("/dp-home"); // Navigate to DP HomePage after successful registration
      }
    } catch (error) {
      alert("Error registering Delivery Personnel");
      console.error(error);
    }
  };

  return (
    <div className="dp-registration-container">
      <div className="dp-registration-form">
        <h2>DP Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="dlNumber">DL Number:</label>
            <input
              type="text"
              id="dlNumber"
              name="dlNumber"
              value={formData.dlNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dlProof">DL Proof (Image):</label>
            <input
              type="file"
              id="dlProof"
              name="dlProof"
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="rcNumber">RC Number:</label>
            <input
              type="text"
              id="rcNumber"
              name="rcNumber"
              value={formData.rcNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rcProof">RC Proof (Image):</label>
            <input
              type="file"
              id="rcProof"
              name="rcProof"
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            Register
          </button>
        </form>

        {/* Link to DP login page */}
        <p>
          Already registered? <Link to="/dp-login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default DPRegistration;
