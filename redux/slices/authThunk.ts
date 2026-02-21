import { createAsyncThunk } from "@reduxjs/toolkit";
import { authServices } from "../../services/authServices";
import { LoginPayload, SignupPayload } from "../../utils/model";


export const signupThunk = createAsyncThunk(
    "auth/signup",
    async (payload: SignupPayload, thunkAPI) => {
        try {
            const response = await authServices.signup(payload);
            console.log("Signup response in thunk :", response);
            return response.data;
        } catch (error) {
            console.log("Error in signup thunk:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const loginThunk = createAsyncThunk(
    "auth/login",
    async (payload: LoginPayload, thunkAPI) => {
        try {
            const response = await authServices.login(payload);
            console.log("Login response in thunk :", response);
            return response.data;
        } catch (error) {
            console.log("Error in login thunk:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const verifyOtpThunk = createAsyncThunk(
    "auth/verifyOtp",
    async ({ email, otp, mode }: { email: string; otp: string; mode: "signup" | "login" }, thunkAPI) => {
        try {
            const response = await authServices.verifyOtp(email, otp, mode);
            console.log("OTP verification response in thunk :", response);
            return response;
        } catch (error) {
            console.log("Error in OTP verification thunk:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const resetPasswordThunk = createAsyncThunk(
    "auth/resetPassword",
    async ({ email, newPassword }: { email: string; newPassword: string }, thunkAPI) => {
        try {
            const response = await authServices.resetPassword(email, newPassword);
            console.log("Reset password response in thunk :", response);
            return response.data;
        } catch (error) {
            console.log("Error in reset password thunk:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)
export const logoutThunk = createAsyncThunk(
    "auth/logout",
    async ({ email }: { email: string }, thunkAPI) => {
        try {
            const res = await authServices.logout(email);
            console.log("Logout response in thunk :", res);
            return res.data;
        } catch (error) {
            console.log("Error in logout thunk:", error);
            return thunkAPI.rejectWithValue(error);
        }
    }
)

