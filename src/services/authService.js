import Axios from "./axios";
import { toast } from "sonner";

// Login user
export const loginUser = async (credentials) => {
    try {
        const response = await Axios.post("/users/auth/login", credentials);
        const data = response.data;
        if (data.data.token) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data));
            toast.success("Welcome back!");
            return data.data;
        }
        throw new Error("Login failed. Please try again.");
    } catch (error) {
        const message =
            error.response?.data?.message || "Login failed. Please try again.";
        toast.error(message);
        throw error;
    }
};

// Register user
export const registerUser = async (userData) => {
    try {
        const response = await Axios.post("/users/auth/signup", userData);
        toast.success("Registration successful! Please verify your email.");
        const data = response.data;
        if (data.data.token) {
            localStorage.setItem("token", data.data.token);
            localStorage.setItem("user", JSON.stringify(data.data));
            return data.data;
        }
    } catch (error) {
        const message =
            error.response?.data?.message || "Registration failed. Please try again.";
        toast.error(message);
        throw error;
    }
};

// Verify email
export const verifyEmail = async (token) => {
    try {
        const response = await Axios.post("/auth/verify-email", { token });
        toast.success("Email verified successfully!");
        return response.data;
    } catch (error) {
        toast.error("Email verification failed. Please try again.");
        throw error;
    }
};

// Request password reset
export const requestPasswordReset = async (email) => {
    try {
        const response = await Axios.post("/auth/forgot-password", { email });
        toast.success("Password reset instructions sent to your email.");
        return response.data;
    } catch (error) {
        toast.error("Failed to send reset instructions. Please try again.");
        throw error;
    }
};

// Reset password
export const resetPassword = async (token, newPassword) => {
    try {
        const response = await Axios.post("/auth/reset-password", {
            token,
            newPassword,
        });
        toast.success("Password reset successful! Please login with your new password.");
        return response.data;
    } catch (error) {
        toast.error("Password reset failed. Please try again.");
        throw error;
    }
};

// Change password
export const changePassword = async (passwordData) => {
    try {
        const response = await Axios.post("/users/auth/change-password", passwordData);
        toast.success("Password changed successfully!");
        return response.data;
    } catch (error) {
        const message =
            error.response?.data?.message ||
            "Failed to change password. Please try again.";
        toast.error(message);
        throw error;
    }
};

// Logout user
export const logoutUser = () => {
    try {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Logged out successfully");
        window.location.reload();
    } catch (error) {
        toast.error("Logout failed. Please try again.");
        throw error;
    }
};

// Get current user
export const getCurrentUser = () => {
    try {
        const user = localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    } catch (error) {
        toast.error("Error getting user information");
        return null;
    }
};

// Check if user is authenticated
export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};

// Update user profile
export const updateProfile = async (userData) => {
    try {
        const response = await Axios.put(
            "/users/update/" + getCurrentUser()?._id,
            userData
        );
        localStorage.setItem("user", JSON.stringify(response.data.data));
        localStorage.setItem("cachedAddress", "");
        toast.success("Profile updated successfully!");
        return response.data.data;
    } catch (error) {
        const message =
            error.response?.data?.message || "Profile update failed. Please try again.";
        toast.error(message);
        throw error;
    }
};

// Refresh token
export const refreshToken = async () => {
    try {
        const response = await Axios.post("/auth/refresh-token");
        if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            return response.data.token;
        }
    } catch (error) {
        toast.error("Session expired. Please login again.");
        logoutUser();
        throw error;
    }
};
