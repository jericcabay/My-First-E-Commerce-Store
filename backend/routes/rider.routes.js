import express from "express";
import { ProtectRoute } from "../middleware/protectRoute.js";
import { RegisterRider } from "../controllers/auth/signup.controller.js";
import { RidersProfile } from "../controllers/auth/profile.controller.js";

const riders = new express.Router();

riders.post("/register", ProtectRoute, RegisterRider);
riders.get("/profile", ProtectRoute, RidersProfile);

export default riders;