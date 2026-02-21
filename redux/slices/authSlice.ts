import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { logoutThunk, resetPasswordThunk, signupThunk, verifyOtpThunk } from "./authThunk";
export interface UserDetails {
  email: string;
  token: string;
  isEmailVerified: boolean;
  name: string;
  role: string;
  _id: string;
}
export type AuthState = {
  loading: boolean;
  userDetails: UserDetails | null;
  token: string | null;
};

const initialState: AuthState = {
  loading: false,
  userDetails: {
    email: "",
    token: "",
    isEmailVerified: false,
    name: "",
    role: "",
    _id: "",
  },
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // setUserDetails: (state, action: { payload: typeof initialState.userDetails }) => {
    //   state.userDetails = {
    //     email: action.payload.email,
    //     name: action.payload.name,
    //     role: action.payload.role,
    //     _id: action.payload._id,
    //     token: action.payload.token,
    //     isEmailVerified: action.payload.isEmailVerified,
    //   };
    // },
    // setToken: (state, action) => {
    //   state.userDetails.token = action.payload.token;
    //   state.userDetails.isEmailVerified = action.payload.isEmailVerified;
    // },
    clearUserDetails: () => {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signupThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action.payload as UserDetails;
    });

    builder.addCase(verifyOtpThunk.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(verifyOtpThunk.rejected, (state) => {
      state.loading = false;
    })
    builder.addCase(verifyOtpThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.token = ((action.payload as unknown) as { token: string })?.token;
    });

    builder.addCase(resetPasswordThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPasswordThunk.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(resetPasswordThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.userDetails = action.payload as UserDetails;
    });

    builder.addCase(logoutThunk.pending, (state) => {
      state.loading = true;
    })
    builder.addCase(logoutThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.loading = false;
      state.token = null;
      state.userDetails = null;
    });
  }
});

export const { clearUserDetails } = authSlice.actions;
export default authSlice.reducer;
