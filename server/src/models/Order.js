import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    hostName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    pickup: {
        type: String,
        required: true,
    },
    dropoff: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    vehicle: {
        type: String,
        required: true,
        enum: ['bike', 'car', 'truck'],
    },
    handleWithCare: {
        type: String,
        required: true,
        enum: ['yes', 'no'],
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

export default Order;
