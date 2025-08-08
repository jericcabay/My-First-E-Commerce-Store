import express from "express";

import { ProtectRoute } from "../middleware/protectRoute.js";
import { SellerProfile } from "../controllers/auth/profile.controller.js";
import { RegisterSeller } from "../controllers/auth/signup.controller.js";

const seller = express.Router();

seller.post("/register", ProtectRoute, RegisterSeller);
seller.get("/", ProtectRoute, SellerProfile);

export default seller;