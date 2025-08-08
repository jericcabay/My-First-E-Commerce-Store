import jwt from "jsonwebtoken";
import User from "../models/auth.model.js";

export const ProtectRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;

        console.log("cookies recieve", req.cookies);
        if(!accessToken) {
            return res.status(401).json({ message: "Unauthirize - No access token provided" });
        }

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            const user = await User.findById(decoded.userId).select("-password");

            if(!user) {
                return res.status(401).json({ message: "User not found" });
            }

            req.user = user;
            next();
        } catch (error) {
            if(error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized - Access token expired" });
            }
            throw error;
        }
    } catch (error) {
        console.log("Error in PROTECT ROUTE middleware", error.message);
        return res.status(401).json({ message: "Unauthorized - Invalid access token" });
    }
}