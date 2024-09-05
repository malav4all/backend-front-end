import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../utils/store";
import { FormattedResources } from "../models/interfaces";
import { ListOfMenusType } from "../utils/AuthorizationManager";
export interface AuthState {
  authenticated: boolean;
  accessToken: string;
  refreshToken?: string;
  loading: boolean;
  isAccountAdmin: boolean;
  isSuperAdmin: boolean;
  imeiList: any;
  deviceGroup: any;
  userName: string;
  email?: string;
  role: string;
  roleId: number | string;
  account: string;
  resources: FormattedResources;
  accountId: string;
  userId: string;
  roleName: string;
  tenantId: string;
  sidebar: ListOfMenusType[];
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
  account: "",
  accountId: "",
  userId: "",
  resources: {} as FormattedResources,
  roleName: "",
  tenantId: "",
  sidebar: [],
  isAccountAdmin: false,
  isSuperAdmin: false,
  imeiList: [],
  deviceGroup: {},
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
        sidebar: ListOfMenusType[];
        isAccountAdmin: boolean;
        isSuperAdmin: boolean;
        imeiList: Array<any>;
        deviceGroup: any;
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
      state.sidebar = action?.payload?.sidebar;
      state.isAccountAdmin = action.payload.isAccountAdmin;
      state.isSuperAdmin = action.payload.isSuperAdmin;
      state.imeiList = action.payload.imeiList;
      state.deviceGroup = action.payload.deviceGroup;
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
      state.role = "";
      state.resources = {};
      state.accountId = "";
      state.roleName = "";
      state.tenantId = "";
      state.isAccountAdmin = false;
      state.isSuperAdmin = false;
      state.imeiList = [];
      state.deviceGroup = {};
    },
    updateTokens: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    setAccountId: (state, action: PayloadAction<string>) => {
      state.tenantId = action.payload;
    },
  },
});

export const {
  loginAction,
  logOutAction,
  addLoading,
  updateUserName,
  updateTokens,
  setAccountId,
} = authSlice.actions;

export const selectAuthenticated = (state: RootState) =>
  state.auth.authenticated;
export const selectAccessToken = (state: RootState) => state.auth.accessToken;
export const selectLoading = (state: RootState) => state.auth.loading;
export const selectEmail = (state: RootState) => state.auth.email;
export const selectName = (state: RootState) => state.auth.userName;
export const selectRole = (state: RootState) => state.auth.role;
export const selectRoleId = (state: RootState) => state.auth.roleId;
export const selectAccount = (state: RootState) => state.auth.account;
export const selectResources = (state: RootState) => state.auth.resources;
export const selectSidebar = (state: RootState) => state?.auth?.sidebar;
export const isAccountAdmin = (state: RootState) => state?.auth?.isAccountAdmin;
export const isSuperAdmin = (state: RootState) => state?.auth?.isSuperAdmin;
export const imeiList = (state: RootState) => state?.auth?.imeiList;
export const deviceGroup = (state: RootState) => state?.auth?.deviceGroup;
export default authSlice.reducer;
