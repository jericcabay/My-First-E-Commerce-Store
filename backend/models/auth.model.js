import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        default: () => Math.floor(100000 + Math.random() * 900000).toString(),
    },
    profileImage: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    gender: {
        type: String,
        default: "",
    },
    birthday: {
        type: String,
        default: "",
    },
    age: {
        type: Number,
        default: "",
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
    },
    mobile: {
        type: String,
        default: "",
    },
    country: {
        type: String,
        default: "",
    },
    city: {
        type: String,
        default: "",
    },
    zipCode: {
        type: String,
        default: "",
    },
    role: {
        type: String,
        enum: ["customer", "seller", "owner", "staff", "admin", "rider"],
        default: "customer"
    },
    cartItems: [
        {
            quantity: {
                type: Number,
                default: 1,
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
            }
        }
    ]
}, {timestamps: true});

userSchema.virtual("fullAddress").get(function () {
    if(!this.address) return {};
    const [street, city, country, zip] = this.address.split(" ");
    return { street, city, country, zip }
});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    try{
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }catch(error) {
        next(error);
    }
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;