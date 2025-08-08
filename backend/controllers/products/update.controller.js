import Product from "../../models/products.model.js";

export const EditTheCurrentProducts = async (req, res) => {
    try {
        const productsId = req.params.edit;
        const updates = req.body;

        const updatedProducts = await Product.findByIdAndUpdate(
            productsId,
            updates,
            { new: true }
        )

        if(!updatedProducts) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(updatedProducts);
    } catch (error) {
        console.error("Error in Edit Products controller", error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}