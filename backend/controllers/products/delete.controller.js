import Product from "../../models/products.model.js";
import cloudinary from "../../lib/cloudinary.js";

export const DeleteTheProducts = async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		// Delete image from Cloudinary if it exists
		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("Deleted image from Cloudinary");
			} catch (error) {
				console.log("Error deleting image from Cloudinary:", error.message);
			}
		}

		await Product.findByIdAndDelete(req.params.id);
		res.json({ message: "Product deleted successfully" });
	} catch (error) {
		console.log("Error in Deleting Products controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};
