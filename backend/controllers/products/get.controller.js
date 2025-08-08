import Product from "../../models/products.model.js"

export const GetTheProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.json({ products });
    } catch (error) {
        console.log("Error in Get Products By Category controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message});
    }
}

export const GetProductsByUserId = async (req, res) => {
	const { userId } = req.params;

	try {
		console.log("Fetching products for userId:", userId);
		const products = await Product.find({ userId: userId });
		res.status(200).json(products);
	} catch (error) {
		console.error("Error fetching products by seller: ", error);
		res.status(500).json({ message: "Server Error" });
	}
};
