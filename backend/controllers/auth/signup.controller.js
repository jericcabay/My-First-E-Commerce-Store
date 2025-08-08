import { GenerateTokens, setCookies } from "../../middleware/generateTokens.js";

import User from "../../models/auth.model.js";
import Seller from "../../models/seller.model.js";
import Riders from "../../models/rider.model.js";

// SignUp The User
export const Signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: "Email already registered" });

    const user = await User.create({ name, email, password });
    const { accessToken } = GenerateTokens(user._id);
    setCookies(res, accessToken);

    res.status(201).json({
      message: "Account created successfully",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Register The User To Seller
export const RegisterSeller = async (req, res) => {
  try {
    const { titleStore, businessEmail, businessNumber, governmentIdType, description } = req.body;
    const userId = req.user._id;

    const user = await Seller.findOne({ userId });
    
    if (user) {
      return res.status(400).json({ message: "You are already registered as a seller" });
    }

    const newSeller = await Seller.create({
      userId,
      titleStore,
      businessEmail,
      businessNumber,
      governmentIdType,
      description,
    });

    await User.findByIdAndUpdate(userId, { role: "seller" });

    return res.status(201).json({
      message: "Seller registered successfully",
      seller: newSeller,
    });

  } catch (error) {
    console.error("Error registering seller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const RegisterRider = async (req, res) => {
  try {
    const {vehicleType, plateNumber, licenceNumber, mobile, gender, birthday, age, country, city, zipCode,} = req.body;
    const userId = req.user._id;
    const user = await User.findOne(userId);
    const riderId = req.userId;
    const rider = await Riders.findOne(riderId);
    
    
    if(rider || user?.role.toLowerCase() === "rider".toLowerCase()) {
      return res.status(404).json({ message: "The User already Register"});
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRiders = await Riders.create({
      userId,
      vehicleType, 
      plateNumber, 
      licenceNumber
    });

    const updateUser = await User.findByIdAndUpdate(userId, {
      role: "rider",
      mobile,
      gender,
      birthday,
      age,
      country,
      city,
      zipCode,
    }, {new: true});

    res.status(201).json({message: "Register Successfully", rider: newRiders, user: updateUser});
  } catch (error) {
    console.log("Error in Register Riders Controller", error);
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
}