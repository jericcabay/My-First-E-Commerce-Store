export const RemoveAllProductFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        if(!productId) {
            user.cartItems = [];
        }else {
            user.cartItems = user.cartItems.filter((item) => item.id !== productId);
        }

        await user.save();
        res.json(user.cartItems);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};