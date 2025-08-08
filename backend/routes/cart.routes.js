import express from "express";
import { ProtectRoute } from "../middleware/protectRoute.js";
import { AddToCart } from "../controllers/cart/post.controller.js";
import { GetCartProduct } from "../controllers/cart/get.controller.js";
import { UpdateProductQuantityInCart } from "../controllers/cart/update.controller.js";
import { RemoveAllProductFromCart } from "../controllers/cart/delete.controller.js";

const cart = express.Router();

cart.post("/", ProtectRoute, AddToCart);
cart.get("/", ProtectRoute, GetCartProduct);
cart.put("/:id", ProtectRoute, UpdateProductQuantityInCart);
cart.delete("/", ProtectRoute, RemoveAllProductFromCart);

export default cart;