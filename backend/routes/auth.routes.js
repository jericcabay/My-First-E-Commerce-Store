import express from "express";
import Upload from "../middleware/multer.middleware.js";


import { Signup } from "../controllers/auth/signup.controller.js";
import { Login } from "../controllers/auth/login.controller.js";
import { Logout } from "../controllers/auth/logout.controller.js";
import { Profile } from "../controllers/auth/profile.controller.js";

import { ProtectRoute } from "../middleware/protectRoute.js";
import { EditProfileInfo } from "../controllers/auth/update.controller.js";

const auth = express.Router();

auth.post("/signup", Signup);
auth.post("/login", Login);
auth.post("/logout", Logout);
auth.put("/:edit", ProtectRoute, EditProfileInfo)

auth.get("/profile", ProtectRoute, Profile);
auth.put('/profile_image', ProtectRoute, Upload.single('image'), Profile);

export default auth;