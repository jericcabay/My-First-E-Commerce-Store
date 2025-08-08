import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import AuthRoutes from "../backend/routes/auth.routes.js"
import ProductRoutes from "../backend/routes/products.routes.js"
import StaffRoutes from "../backend/routes/staff.routes.js"
import CartRoutes from "../backend/routes/cart.routes.js"
import SellerRoutes from "../backend/routes/seller.route.js"
import OrderRoutes from "../backend/routes/order.routes.js"
import RiderRoutes from "../backend/routes/rider.routes.js"

import { connectDB } from './lib/database.js';

dotenv.config();

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json({ limit: "15mb" }));
server.use(cookieParser());

server.use("/api/auth", AuthRoutes);
server.use("/api/products", ProductRoutes);
server.use("/api/staff", StaffRoutes);
server.use("/api/cart", CartRoutes);
server.use("/api/seller", SellerRoutes);
server.use("/api/order", OrderRoutes);
server.use("/api/riders", RiderRoutes);



server.listen(PORT, () => {
    console.log("Server is running on http://localhost:" + PORT);
    connectDB();
});