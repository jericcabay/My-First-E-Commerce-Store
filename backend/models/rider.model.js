import mongoose from "mongoose";

const ridersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    vehicleType: {
        type: String,
        default: "",
    },
    plateNumber: {
        type: String,
        default: "",
    },
    licenceNumber: {
        type: String,
        default: "",
    },
}, {timestamps: true});

const Riders = mongoose.model("Riders", ridersSchema);

export default Riders;