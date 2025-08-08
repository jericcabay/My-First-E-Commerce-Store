import Product from "../../models/products.model.js"

export const GetCartProduct = async (req, res) => {
  try {
    const productIds = req.user.cartItems.map(item => item.product);
    const products = await Product.find({ _id: { $in: productIds } });
    
    const cartItems = req.user.cartItems.map((item) => {
      const product = products.find(p => p._id.toString() === item.product.toString());

      if (!product) return null;

      return {
        _id: item._id,
        product: {
          _id: product._id,
          name: product.name,
          description: product.description,
          image: product.image,
          price: product.price,
        },
        quantity: item.quantity
      };
    }).filter(Boolean);

    res.status(200).json(cartItems);
  } catch (error) {
    console.log("Error in Get Cart Products controller ", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
