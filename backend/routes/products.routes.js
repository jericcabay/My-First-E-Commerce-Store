import express from "express";
import { CreateProducts } from "../controllers/products/create.controller.js";

import { ProtectRoute } from "../middleware/protectRoute.js";
import { GetProductsByUserId, GetTheProductsByCategory } from "../controllers/products/get.controller.js";
import { DeleteTheProducts } from "../controllers/products/delete.controller.js";
import { EditTheCurrentProducts } from "../controllers/products/update.controller.js";

const product = express.Router();

product.post("/create", ProtectRoute, CreateProducts); //CreateProducts
product.get("/category/:category", GetTheProductsByCategory); //GetProductByCategory
//product.get("/all", ); //GetAllProducts
product.put("/:edit", ProtectRoute, EditTheCurrentProducts) //EditTheProducts
product.delete("/:id", ProtectRoute, DeleteTheProducts); DeleteTheProducts

product.get("/seller/:userId", ProtectRoute, GetProductsByUserId);

export default product;