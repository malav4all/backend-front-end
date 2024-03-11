import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../utils/store";
import { FormattedResources } from "../models/interfaces";

export interface AuthState {
  authenticated: boolean;
  accessToken: string;
  refreshToken: string;
  loading: boolean;
  userName: string;
  email?: string;
  role: string;
  roleId: number | string;
  isManager: boolean;
  account: string;
  resources: FormattedResources;
  accountId: string;
  userId: string;
  roleName: string;
  tenantId: string;
  apiKey: string;
}

const initialState: AuthState = {
  authenticated: false,
  accessToken: "",
  refreshToken: "",
  loading: false,
  userName: "",
  email: "",
  role: "",
  roleId: "",
  isManager: false,
  resources: {} as FormattedResources,
  account: "",
  accountId: "",
  userId: "",
  roleName: "",
  tenantId: "",
  apiKey: "",
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
        roleId: number | string;
        resources: FormattedResources;
        account: string;
        accountId: string;
        userId: string;
        roleName: string;
        tenantId: string;
        apiKey: string;
      }>
    ) => {
      state.authenticated = action.payload.authenticated;
      state.accessToken = action.payload.accessToken;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.roleId = action.payload.roleId;
      state.resources = action.payload.resources;
      state.account = action.payload.account;
      state.accountId = action.payload.accountId;
      state.userId = action.payload.userId;
      state.roleName = action.payload.roleName;
      state.tenantId = action.payload.tenantId;
      state.apiKey = action.payload.apiKey;
    },
    addLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addIsManager: (state, action: PayloadAction<boolean>) => {
      state.isManager = action.payload;
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
      state.role = "";
      state.roleId = "";
      state.isManager = false;
      state.resources = {};
      state.accountId = "";
      state.userId = "";
      state.roleName = "";
      state.tenantId = "";
      state.apiKey = "";
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
  addIsManager,
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
export const selectRoleId = (state: RootState) => state.auth.roleId;
export const selectIsManager = (state: RootState) => state.auth.isManager;
export const selectResources = (state: RootState) => state.auth.resources;
export const selectAccount = (state: RootState) => state.auth.account;
export default authSlice.reducer;
