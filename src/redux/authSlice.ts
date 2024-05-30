import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../utils/store";
import { FormattedResources } from "../models/interfaces";

export interface AuthState {
  authenticated: boolean;
  accessToken: string;
  refreshToken?: string;
  loading: boolean;
  userName: string;
  email?: string;
  role: string;
  userId: string;
  account: string;
  resources: FormattedResources;
  accountId: string;
}

const initialState: AuthState = {
  authenticated: false,
  accessToken: "",
  refreshToken: "",
  loading: false,
  userName: "",
  email: "",
  role: "",
  account: "",
  accountId: "",
  userId: "",
  resources: {} as FormattedResources,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginAction: (
      state,
      action: PayloadAction<{
        authenticated: boolean;
        accessToken: string;
        userName: string;
        email: string;
        role: string;
        userId: string;
        account: string;
        accountId: string;
        resources: FormattedResources;
      }>
    ) => {
      state.authenticated = action.payload.authenticated;
      state.accessToken = action.payload.accessToken;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.resources = action.payload.resources;
      state.account = action.payload.account;
      state.accountId = action.payload.accountId;
      state.userId = action.payload.userId;
    },
    addLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    updateUserName: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
    },
    logOutAction: (state, action: {}) => {
      state.authenticated = false;
      state.loading = false;
      state.accessToken = "";
      state.userName = "";
      state.email = "";
      state.accountId = "";
      state.role = "";
      state.resources = {};
    },
    updateTokens: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
  },
});

export const {
  loginAction,
  logOutAction,
  addLoading,
  updateUserName,
  updateTokens,
} = authSlice.actions;

export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectName = (state: RootState) => state.auth.userName;
export const selectRole = (state: RootState) => state.auth.role;
export const selectAccount = (state: RootState) => state.auth.account;
export const selectResources = (state: RootState) => state.auth.resources;

export default authSlice.reducer;
