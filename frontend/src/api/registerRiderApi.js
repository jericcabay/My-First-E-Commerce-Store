import { create } from "zustand";
import axios from "../lib/axios.js";
import { toast } from "react-hot-toast";

export const registerRiderApi = create((set, get) => ({
    rider: null,
    loading: false,
    checkingAuth: true,

    registerAsRider: async(riderData) => {
        set({ loading: true });

        try {
            const res = await axios.post("/riders/register", riderData);
            toast.success(res.data.message || "Rider register successfull");

            return true;
        } catch (error) {
            console.error("Riders registration error:", error?.response?.data || error.message);
                toast.error(error.response?.data?.message || "Failed to register as seller");
                return false;
        }finally {
            set({ loading: false });
        }
    },

    profile: async () => {
        set({ checkingAuth: true });

        try {
            const response = await axios.get("/rider");
            set({ profile: response.data, checkingAuth: false });
        } catch (error) {
            console.log(error.message);
            set({ checkingAuth: false, rider: null});
        }
    },
}));