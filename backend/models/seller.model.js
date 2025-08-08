import mongoose from "mongoose";


const sellerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    titleStore: {
        type: "String",
        required: true,
    },
    businessEmail: {
        type: "String",
        required: true,
    },
    businessNumber: {
        type: "Number",
        required: true,
    },
    governmentIdType: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
        required: true,
    }
    
}, {timestamps: true});

const Seller = mongoose.model("Seller", sellerSchema);

export default Seller;