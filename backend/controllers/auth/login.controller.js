import { GenerateTokens, setCookies } from "../../middleware/generateTokens.js";
import User from "../../models/auth.model.js";

export const Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      const { accessToken } = GenerateTokens(user._id);
      setCookies(res, accessToken);

      return res.status(202).json({
        message: "Login successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    }
    res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};