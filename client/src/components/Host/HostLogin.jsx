import { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Reuse the same CSS for consistent styling
import { useNavigate } from 'react-router-dom';

const HostLogin = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });

    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/hosts/login', formData);
            //console.log(response.data); // Log to see the response
            alert(response.data.message);
            if (response.data.message === "login successful") {
                navigate('/hosthomepage'); // Use navigate to redirect
            }
        } catch (error) {
            setLoginError('Invalid name or password');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="host-login">
            <h2>Host Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {loginError && <p className="error">{loginError}</p>} {/* Display login error */}

                <button type="submit">Login</button>
            </form>

            <p className="create-account-link">
                Dont have an account? <a href="/register">Create one</a>
            </p>
        </div>
    );
};

export default HostLogin;
