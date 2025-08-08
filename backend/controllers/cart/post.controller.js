export const AddToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!user.cartItems) {
      user.cartItems = [];
    }

    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      user.cartItems.push({ product: productId, quantity: 1 });
    }

    await user.save();

    await user.populate("cartItems.product");

    res.status(200).json(user.cartItems);
  } catch (error) {
    console.log("Error in Add To Cart controller", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
