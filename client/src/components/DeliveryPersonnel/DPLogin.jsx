import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, Paper, TextField } from "@mui/material";
import styles from "./authPageStyles.module.css"; // Reuse the same CSS for consistent styling

const DPLogin = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/auth/login`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        // Navigate to DP homepage after successful login
        const dp = response.data.dp;
        sessionStorage.setItem("dpInfo", JSON.stringify(dp));
        navigate("/dp-home");
      }
    } catch (e) {
      setLoginError("Invalid name or password");
      console.warn(e);
    }
  };

  useEffect(() => {
    const dpInfo = sessionStorage.getItem("dpInfo");
    if (dpInfo) navigate("/dp-home");
  }, [navigate]);

  return (
    <Box className={styles.login_page_container}>
      <Paper elevation={6} className={styles.login_card}>
        <h2>DP Login</h2>

        <Box className={styles.login_fields_box}>
          <TextField
            name="name"
            value={formData.name}
            label="Username"
            onChange={handleChange}
            required
          />
          <TextField
            name="password"
            value={formData.password}
            label="Password"
            onChange={handleChange}
            required
            type="password"
          />
          {loginError && <p className="error">{loginError}</p>}{" "}
          <Button variant="contained" type="submit" onClick={handleSubmit}>
            Login
          </Button>
        </Box>

        <p className="create-account-link">
          Don&apos;t have an account? <a href="/dp-register">Register here</a>
        </p>
      </Paper>
    </Box>
  );
};

export default DPLogin;
