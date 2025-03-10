// src/app/redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<AuthState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    loginSuccess(state, action: PayloadAction<{ user: AuthState["user"] }>) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      return {
        ...state,
        ...(action as PayloadAction<{ auth: AuthState }>).payload.auth,
      };
    });
  },
});

export const { setAuthState, loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;