export const BASE_URL = "http://localhost:9000";
const endPoints = {
    signup: "/api/v1/auth/signup",
    login: "/api/v1/auth/login",
    verifySignupOtp: "/api/v1/auth/verify-email",
    verifyLoginOtp: "/api/v1/auth/verify-otp",
    resendOtp: "/api/v1/auth/resend-otp",
    forgotPassword: "/api/v1/auth/forgot-password",
    logout: "/api/v1/auth/logout"
}

export default endPoints;