import { create } from "zustand";
import axios from "../lib/axios.js";
import toast from "react-hot-toast";

export const useProductApi = create((set) => ({
    products: [],
    loading: false,

    setProducts: (products) => set({ products }),
    createProducts: async (productData) => {
        try {
            const response = await axios.post('/products/create', productData);
            set((prevState) => ({
                products: [ ...prevState.products, response.data],
                loading: false,
            }));

            toast.success("Product Successfully created");
        } catch (error) {
            toast.error(error.response.data.error);
            set({ loading: false });
        }
    },

    GetTheProductsByCategory: async (category) => {
        set({ loading: true });
        try {
            const response = await axios.get(`/products/category/${category}`)
            set({ products: response.data.products, loading: false });
            return response.data.products;
        } catch (error) {
            set({ error: "Failed to Get The Products By Category", loading: false });
            return [];
        }
    },

    GetProductsByUserId: async (userId) => {
		try {
			const res = await axios.get(`/products/seller/${userId}`);
			set({ products: res.data });
			console.log("Fetched products", res.data);
		} catch (error) {
			console.log("Failed to fetch seller products", error);
		}
	},

    EditTheProducts: async (productId, updateData) => {
        try {
            const res = await axios.put(`/products/${productId}`, updateData);
            set((state) => ({
                products: state.products.map((p) => 
                    p._id === productId ? res.data : p
                ),
            }));
            toast.success("Product updated successfully");
        } catch (error) {
             set({ loading: false });
            toast.error(error.response.data.error || "Failed to update products");
        }
    },

    DeleteTheProducts: async (productId) => {
        set({ loading: true });
        try {
            await axios.delete(`/products/${productId}`);
            set((prevProducts) => ({
                products: prevProducts.products.filter((product) => product._id !== productId),
                loading: false
            }));
        } catch (error) {
            set({ loading: false });
            toast.error(error.response.data.error || "Failed to delete products");
        }
    }
}));