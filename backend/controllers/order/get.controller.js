import Order from "../../models/order.model.js";

// routes/order.routes.js or controller file

export const ViewCheckoutBySeller = async (req, res) => {
  const sellerId = req.params.userId; // seller's user ID

  try {
    const orders = await Order.find()
      .populate({
        path: "products.product",
        select: "name userId", // populate product's owner
        populate: {
          path: "userId",
          select: "name", // optional, for displaying seller name
        },
      })
      .populate("user", "name email"); // populate customer

    // Filter orders that include at least 1 product by this seller
    const sellerOrders = orders.filter(order =>
      order.products.some(p =>
        p.product?.userId?._id?.toString() === sellerId
      )
    );

    res.json(sellerOrders);
  } catch (error) {
    console.error("Error viewing seller orders:", error);
    res.status(500).json({ message: "Server error while fetching seller orders." });
  }
};


