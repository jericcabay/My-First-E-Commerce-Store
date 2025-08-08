export const Logout = (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};