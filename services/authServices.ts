import ApiService from "."
import endPoints from "../utils/endPoints";
import { LoginPayload, SignupPayload } from "../utils/model";

export const authServices = {
    signup: async (payload: SignupPayload) => {
        try {
            const res = await ApiService.post(endPoints.signup, payload);
            console.log("Signup response in service:", res);
            return res.data;
        } catch (error) {
            console.log("Error in signup service:", error);
            throw error;
        }
    },
    verifyOtp: async (email: string, otp: string, mode: "signup" | "login") => {
        try {
            const endpoint = mode === "signup" ? endPoints.verifySignupOtp : endPoints.verifyLoginOtp;
            const res = await ApiService.post(endpoint, { email, otp });
            console.log("OTP verification response in service:", res);
            return res.data;
        } catch (error) {
            console.log("Error in OTP verification service:", error);
            throw error;
        }
    },
    resendOtp: async (email: string) => {
        try {
            const res = await ApiService.post(endPoints.resendOtp, { email });
            console.log("Resend OTP response in service:", res);
            return res.data;
        } catch (error) {
            console.log("Error in resend OTP service:", error);
            throw error;
        }
    },
    login: async (payload: LoginPayload) => {
        try {
            const res = await ApiService.post(endPoints.login, payload);
            console.log("Login response in service:", res);
            return res.data;
        } catch (error) {
            console.log("Error in login service:", error);
            throw error;
        }
    },
    forgotPassword: async (email: string) => {
        try {
            const res = await ApiService.post(endPoints.forgotPassword, { email });
            console.log("Forgot password response in service:", res);
            return res.data;
        } catch (error) {
            console.log("Error in forgot password service:", error);
            throw error;
        }
    },
    resetPassword: async (email: string, newPassword: string) => {
        try {
            const res = await ApiService.post("/api/v1/auth/reset-password", { email, newPassword });
            console.log("Reset password response in service:", res);
            return res.data;
        } catch (error) {
            console.log("Error in reset password service:", error);
            throw error;
        }
    },
    logout: async (email: string) => {
        try {
            const res = await ApiService.post(endPoints.logout, { email });
            console.log("Logout response in service :", res);
            return res.data;
        } catch (error) {
            console.log("Error in logout :", error);
            throw error;
        }
    }
}