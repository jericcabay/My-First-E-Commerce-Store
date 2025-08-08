import User from "../../models/auth.model.js";

export const RegisterStaff = async (req, res) => {
  try {
    const { userId, role, name, branch } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ message: "User ID and role are required" });
    }

    if (!["staff", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role. Must be 'staff' or 'admin'" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (["staff", "admin"].includes(user.role)) {
      return res.status(400).json({ message: "User is already a staff or admin" });
    }

    // Update user data
    user.role = role;
    user.name = name || user.name;
    user.branch = branch || "Unknown";
    await user.save();

    return res.status(200).json({
      message: `User has been registered as ${role}`,
      user,
    });
  } catch (error) {
    console.error("Register Staff Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
