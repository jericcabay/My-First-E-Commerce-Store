import User from "../../models/auth.model.js";

export const SearchUsername = async (req, res) => {
    const { name } = req.query;

    try {
        const result = await User.find({
            role: "customer",
            name: { $regex: name, $options: 'i'},
        });

        res.json(result);
    } catch (error) {
        res.status(500).json({ message: "Server Error during search" });
    }
}