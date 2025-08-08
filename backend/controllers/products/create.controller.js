import cloudinary from "../../lib/cloudinary.js";
import Product from "../../models/products.model.js";

export const CreateProducts = async (req, res) => {
    try {
        const { name, description, quantity, price, category, image} = req.body;

        let cloudinaryResponse = null;
        
        if(image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const products = await Product.create({
            name,
            description,
            quantity,
            price,
            category,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : " ",
            userId: req.user._id, 
        });

        res.status(201).json(products);
    } catch (error) {
        console.log("Error in CREATE PRODUCT controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message});
    }
}