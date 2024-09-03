// import { useState } from 'react';
// import axios from 'axios';
// import './styles.css'; // Make sure to create this CSS file for styling

// const HostRegistration = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         address: '',
//         dob: '',
//         idProof: null,
//         password: ''
//     });

//     const [emailError, setEmailError] = useState(''); // State for email error message

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         if (name === 'idProof') {
//             setFormData({
//                 ...formData,
//                 [name]: files[0]
//             });
//         } else {
//             setFormData({
//                 ...formData,
//                 [name]: value
//             });
//         }
//     };

//     const handleEmailBlur = () => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//             setEmailError('Please enter a valid email address');
//         } else {
//             setEmailError('');
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (emailError) {
//             alert('Please fix the errors before submitting the form');
//             return;
//         }

//         const data = new FormData();
//         data.append('name', formData.name);
//         data.append('email', formData.email);
//         data.append('address', formData.address);
//         data.append('dob', formData.dob);
//         data.append('idProof', formData.idProof);
//         data.append('password', formData.password);

//         try {
//             const response = await axios.post('http://localhost:4000/api/hosts/register', data, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });
//             console.log('Registration successful', response.data);
//             if (response.data.message === "Registration successful") {
//                 navigate('/login');
//         } catch (error) {
//             console.error('Error registering host:', error);
//         }
//     };

//     return (
//         <div className="host-registration">
//             <h2>Host Registration</h2>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor="name">Name:</label>
//                 <input 
//                     type="text"
//                     id="name"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="email">Email:</label>
//                 <input
//                     type="email"
//                     id="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     onBlur={handleEmailBlur} // Validate email on blur
//                     required
//                 />
//                 {emailError && <p className="error">{emailError}</p>} {/* Display email error */}

//                 <label htmlFor="address">Address:</label>
//                 <input
//                     type="text"
//                     id="address"
//                     name="address"
//                     value={formData.address}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="dob">Date of Birth:</label>
//                 <input
//                     type="date"
//                     id="dob"
//                     name="dob"
//                     value={formData.dob}
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="idProof">ID Proof (Image):</label>
//                 <input
//                     type="file"
//                     id="idProof"
//                     name="idProof"
//                     onChange={handleChange}
//                     required
//                 />

//                 <label htmlFor="password">Password:</label>
//                 <input
//                     type="password"
//                     id="password"
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     required
//                 />

//                 <button type="submit">Register</button>

//                 <p className="already-have-account">
//                  Already have an account? <a href="/login">login</a>
//             </p>
//             </form>
//         </div>
//     );
// };

// export default HostRegistration;



import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import './styles.css'; // Make sure to create this CSS file for styling

const HostRegistration = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: '',
        dob: '',
        idProof: null,
        password: ''
    });

    const [emailError, setEmailError] = useState(''); // State for email error message
    const navigate = useNavigate(); // Initialize useNavigate for navigation

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'idProof') {
            setFormData({
                ...formData,
                [name]: files[0]
            });
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const handleEmailBlur = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (emailError) {
            alert('Please fix the errors before submitting the form');
            return;
        }

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('address', formData.address);
        data.append('dob', formData.dob);
        data.append('idProof', formData.idProof);
        data.append('password', formData.password);

        try {
            const response = await axios.post('http://localhost:4000/api/hosts/register', data, {
                headers: {
                    'Content-Type': 'application/json' 
                }
            });
            alert(response.data.message);
            console.log('Registration successful', response.data);
            if (response.data.message === "Registration successful") {
                navigate('/login'); // Redirect to login page after successful registration
            }
        } catch (error) {
            // console.error('Error registering host:', error);
            alert("Already registered")
        }
    };

    return (
        <div className="host-registration">
            <h2>Host Registration</h2>
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

                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleEmailBlur} // Validate email on blur
                    required
                />
                {emailError && <p className="error">{emailError}</p>} {/* Display email error */}

                <label htmlFor="address">Address:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="dob">Date of Birth:</label>
                <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="idProof">ID Proof (Image):</label>
                <input
                    type="file"
                    id="idProof"
                    name="idProof"
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

                <button type="submit">Register</button>

                <p className="already-have-account">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default HostRegistration;
