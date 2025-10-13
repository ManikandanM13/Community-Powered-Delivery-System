import { useEffect, useState } from 'react';
import axios from 'axios';
import './OrdersPosted.css'; // Import the corresponding CSS file

const OrdersPosted = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
                if (!userInfo) {
                    throw new Error("User not authenticated");
                }
                
                // Fetch orders from the API
                const response = await axios.get(`http://localhost:4000/api/orders?hostName=${userInfo.name}`);
                setOrders(response.data);
            } catch (err) {
                setError('Failed to fetch orders. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleDelete = async (orderId) => {
        try {
            await axios.delete(`http://localhost:4000/api/orders/${orderId}`);
            setOrders(orders.filter(order => order._id !== orderId)); // Remove deleted order from state
            alert("Order deleted successfully.");
        } catch (err) {
            console.error("Failed to delete order:", err);
            alert("Failed to delete the order. Please try again.");
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="orders-posted">
            <h1>Orders Posted</h1>
            {orders.length === 0 ? (
                <p>No orders posted yet.</p>
            ) : (
                <ul className="order-list">
                    {orders.map((order) => (
                        <li key={order._id} className="order-item">
                            <p><strong>Pickup:</strong> {order.pickup}</p>
                            <p><strong>Drop-off:</strong> {order.dropoff}</p>
                            <p><strong>Size:</strong> {order.size}</p>
                            <p><strong>Vehicle:</strong> {order.vehicle}</p>
                            <p><strong>Handle with Care:</strong> {order.handleWithCare}</p>
                            <button 
                                className="delete-button" 
                                onClick={() => handleDelete(order._id)}
                            >
                                Delete Order
                            </button>
                            <hr />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default OrdersPosted;
