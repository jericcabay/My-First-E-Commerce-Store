import express from "express";

import { ProtectRoute } from "../middleware/protectRoute.js";

import { SearchUsername } from "../controllers/staff/search.controller.js";
import { RegisterStaff } from "../controllers/staff/register.controller.js";

const staff = express.Router();

staff.get("/search", ProtectRoute, SearchUsername);
staff.post("/register", ProtectRoute, RegisterStaff);

export default staff;