import { createSlice } from "@reduxjs/toolkit";
import {
  clearTokenExpiration,
  setTokenExpiration,
} from "../../helpers/authHelper";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isAuthenticated: false,
    token: null,
    userName: null,
    role: null,
    imageUrl: null,
  },
  reducers: {
    logInAction: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.userName = action.payload.userName;
      state.role = action.payload.role;
      state.imageUrl = action.payload.imageUrl;
      setTokenExpiration(action.payload.token);
    },

    logOutAction: (state, action) => {
      state.isAuthenticated = false;
      state.token = null;
      state.userName = null;
      state.role = null;
      state.imageUrl = null;
      clearTokenExpiration();
    },
  },
});

export const { logInAction, logOutAction } = accountSlice.actions;
export default accountSlice.reducer;
