export const UpdateProductQuantityInCart = async (req, res) => {
    try {
        const { id: productId } = req.params;
        const { quantity } = req.body;
        const user = req.user;
        const  existingItem = user.cartItems.find((item) => item.id === productId);

        if(existingItem) {
            if(quantity === 0) {
                user.cartItems = user.cartItems.filter((item) => item.id !== productId);
                await user.save();
                return res.json(user.cartItems);
            }
            existingItem.quantity = quantity;
            await user.save();
            res.json(user.cartItems);
        }else {
            res.status(404).json({ message: "Products not found" });
        }
    } catch (error) {
        console.log("Error in Update Quantity controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}