import User from "../../models/auth.model.js";

export const EditProfileInfo = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.edit, req.body, { new: true });
    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
