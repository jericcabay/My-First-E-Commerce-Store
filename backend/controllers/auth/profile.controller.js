import Riders from "../../models/rider.model.js";
import Seller from "../../models/seller.model.js";

export const Profile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    if (req.file) {
      req.user.profileImage = req.file.path;
      await req.user.save();
    }

    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch the SellerSchema in mongoose Database
export const SellerProfile = async (req, res) => {
  try {
    const seller = await Seller.findOne({ userId: req.user._id });
    if (!seller) return res.status(404).json({ message: "Seller profile not found" });

    res.status(200).json(seller);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch the RidersSchema in mongoose Database
export const RidersProfile = async (req, res) => {
  try {
    const rider = await Riders.findOne({ userId: req.user._id });
    if (!rider) return res.status(404).json({ message: "Rider not found" });

    res.status(200).json(rider);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
