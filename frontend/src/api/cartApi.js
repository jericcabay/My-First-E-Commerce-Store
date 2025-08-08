import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const CartApi = create((set, get) => ({
    cart: [],
    total: 0,
    subTotal: 0,

    GetCartItems: async () => {
        try {
            const res = await axios.get("/cart");
            set({ cart: res.data });
            get().CalculateTotals();
        } catch (error) {
            set({ cart: [] });
            toast.error(error.response.data.message || "An error occured");
        }
    },

    AddToCart: async (product) => {
        try {
            await axios.post("/cart", { productId: product._id });
            toast.success("Product added to cart");

            set((prevState) => {
                const existingItem = prevState.cart.find(
                    (item) => item.product._id === product._id
                );

                const newCart = existingItem
                    ? prevState.cart.map((item) =>
                        item.product._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    : [...prevState.cart, { product, quantity: 1 }];

                return { cart: newCart };
            });

            get().CalculateTotals();
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        }
    },


    RemoveFromCart: async (productId) => {
        await axios.delete(`/cart`, { data: { productId } });
        set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
        get().CalculateTotals();
    },

    UpdateQuantity: async (productId, quantity) => {
        if (quantity === 0) {
            get().RemoveFromCart(productId);
            return;
        }

        await axios.put(`/cart/${productId}`, { quantity });

        set((prevState) => ({
            cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item )),
        }));

        get().CalculateTotals();
    },


    
    
    CalculateTotals: () => {
        const { cart } = get();
        const subTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
        let total = subTotal;

        set({ subTotal, total });
    }
}));