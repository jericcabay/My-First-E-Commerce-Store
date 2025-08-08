    import { create } from "zustand";
    import axios from "../lib/axios.js";
    import { toast } from "react-hot-toast";

    export const registerUser = create((set, get) => ({
        profile: null,
        loading: false,
        checkingAuth: true,

        registerAsSeller: async (sellerData) => {
            set({ loading: true });

            try {
                const res = await axios.post("/seller/register", sellerData);
                toast.success(res.data.message || "Seller registered successfully");

                return true;
            } catch (error) {
                console.error("Seller registration error:", error?.response?.data || error.message);
                toast.error(error.response?.data?.message || "Failed to register as seller");
                return false;
            } finally {
            set({ loading: false });
            }
        },
        
        fetchProfile: async () => {
            set({ checkingAuth: true });

            try {
                const response = await axios.get("/seller");
                set({ profile: response.data, checkingAuth: false})
            } catch (error) {
                console.log(error.message);
                set({ checkingAuth: false, user: null});
            }
        }


    }));