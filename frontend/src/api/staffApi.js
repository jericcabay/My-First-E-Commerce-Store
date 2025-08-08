// staffApi.js
import { create } from "zustand";
import axios from "../lib/axios.js";

export const staffApi = create((set) => ({
  loading: false,
  checkingAuth: true,
  customers: [],

  SearchName: async (searchName) => {
    try {
      const res = await axios.get(`/staff/search?name=${searchName}`);
      set({ customers: res.data });
      return res.data;
    } catch (error) {
      console.error("Search Failed: ", error);
      return [];
    }
  },

  RegisterStaff: async (payload) => {
    try {
      const res = await axios.post("/staff/register", payload);
      return res.data;
    } catch (error) {
      console.error("Register Staff Failed: ", error);
      throw error.response?.data || { message: "Something went wrong" };
    }
  },
}));
