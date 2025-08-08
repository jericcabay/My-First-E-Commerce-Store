import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            min: 0,
            required: true,
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;