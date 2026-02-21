export interface LoginPayload {
    email: string;
    password: string;
}
export interface SignupPayload {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: "user" | "admin";
}