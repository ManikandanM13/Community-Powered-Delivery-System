import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import hostRoutes from './routes/authRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // Import order routes
import { Server } from 'socket.io';
import { createServer } from 'http';
import session from 'express-session';
import morgan from 'morgan';

dotenv.config();

const app = express();
app.use(morgan('dev'));
app.use(session({ secret: process.env.SESSION_SECRET }));
const server = createServer(app);

const io = new Server(server, {
  origin: process.env.CLIENT_URL,
});

io.on("connection", (socket) => {
  console.log("Socket Connected!");
});

// Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/auth", hostRoutes);
app.use('/api/orders', orderRoutes); // Use order routes

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));