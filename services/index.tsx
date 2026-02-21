import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import config from "../config";
import {
  ERROR_TOAST,
  SHOW_INTERNET_TOAST,
  SUCCESS_TOAST,
} from "../utils/toasts";
import { BASE_URL } from "../utils/endPoints";

const SOMETHING_WENT_WRONG = "OOPS! Something went wrong";
// const BASE_URL = config.API_URL + "/api/v1/";


export const status_code = {
  success: 200,
  invalid: 400,
  timeout: 408,
  notFound: 204,
  badRequest: 400,
  userDelete: 410,
  serverError: 500,
  Unauthorized: 401,
  successAction: 201,
} as const;

export type ApiResponse<T = unknown> = {
  success: boolean;
  message: string;
  status: string;
  code: number;
  data: T;
};

export type ErrorResponse = {
  message: string;
  status: number;
};

/**
 * Create Axios Instance
 */
const createAxiosInstance = (
  baseURL: string,
  headers: Record<string, string> = {}
): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    timeout: 30000,
    headers,
  });

  // ✅ Attach token
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const accessToken = ""; // later replace with your token logic
      if (accessToken) {
        config.headers.set("Authorization", `Bearer ${accessToken}`);
      }
      return config;
    }
  );

  // ✅ Handle responses
  instance.interceptors.response.use(
    <T,>(
      response: AxiosResponse<ApiResponse<T>>
    ): AxiosResponse<ApiResponse<T>> => {
      // ✅ Success response handling
      if (response.data?.success) {
        if (response.data?.message) {
          SUCCESS_TOAST(response.data.message);
        }
      }
      return response;
    },
    (error): Promise<ErrorResponse> => {
      const message =
        error?.response?.data?.message ||
        error?.response?.message ||
        error?.response?.statusText ||
        error?.message ||
        SOMETHING_WENT_WRONG;

      const status: number = error?.response?.status || error?.status || 0;

      if (!error.response) {
        if (error.code === "ECONNABORTED") {
          ERROR_TOAST("Request timeout. Please try again.");
          return Promise.reject({
            message: "Request timeout. Please try again.",
            status: status_code.timeout,
          });
        }
        SHOW_INTERNET_TOAST();
        return Promise.reject({
          message: "Network error. Please check your internet connection.",
          status: 0,
        });
      }

      if (status === 401) sessionExpireHandler();

      ERROR_TOAST(message);

      return Promise.reject({ message, status });
    }
  );

  return instance;
};

/**
 * Instances
 */
const $http = createAxiosInstance(BASE_URL, {
  "Content-Type": "application/json",
  language: "EN",
  platform: "expo", // since you are using React Native Expo
  version: "1.0.0",
});

const $httpFileUpload = createAxiosInstance(BASE_URL, {
  "Content-Type": "multipart/form-data",
  language: "EN",
  platform: "expo",
});

/**
 * API Service
 */
const ApiService = {
  async get<T>(endPoint: string, params?: string) {
    return $http.get<ApiResponse<T>>(endPoint + (params || ""));
    // return response.data;
  },

  async post<T>(endPoint: string, body: unknown) {
    return $http.post<ApiResponse<T>>(endPoint, body);
    // return response.data;
  },

  async put<T>(endPoint: string, body: unknown) {
    const response = await $http.put<ApiResponse<T>>(endPoint, body);
    return response.data;
  },

  async patch<T>(endPoint: string, body: unknown) {
    const response = await $http.patch<ApiResponse<T>>(endPoint, body);
    return response.data;
  },

  async delete<T>(endPoint: string) {
    const response = await $http.delete<ApiResponse<T>>(endPoint);
    return response.data;
  },

  async upload<T>(endPoint: string, body: FormData) {
    const response = await $httpFileUpload.post<ApiResponse<T>>(endPoint, body);
    return response.data;
  },
};

// ✅ Session Expire Handler
const sessionExpireHandler = () => {
  ERROR_TOAST("Session expired. Please login again.");
  // Example: navigate to login page
  // navigation.reset({ index: 0, routes: [{ name: "Login" }] });
};

export default ApiService;
