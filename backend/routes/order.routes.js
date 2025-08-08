import express from "express";
import { ProtectRoute } from "../middleware/protectRoute.js";

import { ViewCheckoutBySeller } from "../controllers/order/get.controller.js";
import { CreateOrder } from "../controllers/order/post.controller.js";

const order = express.Router();

order.get("/orders/:userId", ProtectRoute, ViewCheckoutBySeller);
order.post("/checkout", ProtectRoute, CreateOrder);

export default order;