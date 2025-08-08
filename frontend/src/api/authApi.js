import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const authUser = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data, loading: false });
      toast.success(res.data.message);
      return true;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Signup failed");
      return false;
    }
  },

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });
      set({ user: res.data, loading: false });
      localStorage.setItem("userId", res.data._id);
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "Login failed");
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
    } catch (error) {
      toast.error("Logout failed");
    }
  },

  profile: async () => {
    try {
      set({ checkingAuth: true });
      const res = await axios.get("/auth/profile");
      set({ user: res.data, checkingAuth: false });
    } catch {
      set({ user: null, checkingAuth: false });
    }
  },

  updateProfileImage: async (file) => {
    try {
      set({ loading: true });
      const formData = new FormData();
      formData.append("profileImage", file);
      const res = await axios.post("/auth/upload-profile", formData);
      set({ user: res.data, loading: false });
      toast.success("Profile image updated");
      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error("Upload failed");
    }
  },

  EditProfileInfo: async (userId, updateData) => {
    try {
      const res = await axios.put(`/auth/${userId}`, updateData);
      set({ user: res.data });
      toast.success("Profile updated");
      return res.data;
    } catch (error) {
      toast.error("Update failed");
    }
  },
}));
