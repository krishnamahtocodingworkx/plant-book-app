/**
 * @file toast.ts
 * @description Toast utility methods for consistent usage across the app
 */

import { Toast } from "toastify-react-native";

/**
 * Show a generic error toast
 */
export const ERROR_TOAST = (message: string = "OOPS! Something went wrong") => {
  Toast.error(message.toString());
};

/**
 * Show internet connection error
 */
export const SHOW_INTERNET_TOAST = () => {
  Toast.error("Please check your internet connection.");
};

/**
 * Show logout success
 */
export const LOGOUT_TOAST = () => {
  Toast.success("Logout Successful");
};

/**
 * Show success toast
 */
export const SUCCESS_TOAST = (message: string = "Successful") => {
  Toast.success(message.toString());
};

export default ERROR_TOAST;
