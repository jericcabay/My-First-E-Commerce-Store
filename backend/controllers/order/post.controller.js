// File: controllers/order.controller.js (or similar location)

import Order from "../../models/order.model.js";
import User from "../../models/auth.model.js";
import Product from "../../models/products.model.js";

export const CreateOrder = async (req, res) => {
  try {
    const { userId, products } = req.body;

    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let totalAmount = 0;

    // Decrement stock of each product
    for (const item of products) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }

      if (product.quantity < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for ${product.name}` });
      }

      product.quantity -= item.quantity; // decrement stock
      await product.save();

      totalAmount += item.price * item.quantity;
    }

    const order = new Order({
      user: user._id,
      products: products.map(p => ({
        product: p.productId,
        quantity: p.quantity,
        price: p.price,
      })),
      totalAmount
    });

    await order.save();

    // Optional: clear user's cart after successful checkout
    user.cartItems = [];
    await user.save();

    res.status(201).json({ message: "Order created and stock updated successfully" });

  } catch (error) {
    console.error("Checkout Error:", error);
    res.status(500).json({ message: "Server error during checkout." });
  }
};
