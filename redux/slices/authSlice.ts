import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  email: "",
  token: "",
  isEmailVerified: false,
  name: "",
  role: "",
  _id: "",
};

const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUserDetails: (state, action) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.isEmailVerified = action.payload.isEmailVerified;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state._id = action.payload._id;
    },
    setToken: (state, action) => {
      state.token = action.payload.token;
      state.isEmailVerified = action.payload.isEmailVerified;
    },
    clearUserDetails: () => {
      return initialState;
    },
  },
});

export const { setUserDetails, clearUserDetails, setToken } = authSlice.actions;
export default authSlice.reducer;
