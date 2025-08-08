import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const OrderApi = create((set, get) => ({
    orders: [],
    
    FetchOrder: async () => {
        try {
            const userId = localStorage.getItem("userId");
            const res = await axios.get(`/order/orders/${userId}`);
            set({ orders: res.data });
        } catch (error) {
            console.error("Error fetching orders", error);
        }
    },
    CheckOut: async ({ userId, products }) => {
        try {
            const response = await axios.post("/order/checkout", {
                userId,
                products
            });
            toast.success("Checkout successfull");
            return response.data;
        } catch (error) {
            console.error("Checkout failed", error);
            toast.error("Not enough Stock");
            return null;
        }
    },
}))