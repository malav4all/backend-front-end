import { store } from "../../../utils/store";

export const deviceOnboardingTableHeader = [
  {
    name: "AccountId",
    field: "accountId",
  },
  {
    name: "Device Account",
    field: "deviceOnboardingAccount",
  },
  {
    name: "Device Onboarding Sim",
    field: "deviceOnboardingSimNo",
  },

  {
    name: "Device IMEI No",
    field: "deviceOnboardingIMEINumber",
  },
  {
    name: "Action",
    field: "action",
    align: "center",
  },
];

export const deviceListTable = [
  {
    name: "AccountId",
    field: "accountId",
  },
  {
    name: "Device Name",
    field: "deviceName",
  },
  {
    name: "Device Account",
    field: "deviceOnboardingAccount",
  },
  {
    name: "Device Onboarding Sim",
    field: "deviceOnboardingSimNo",
  },

  {
    name: "Device IMEI No",
    field: "deviceOnboardingIMEINumber",
  },
  {
    name: "Action",
    field: "action",
    align: "center",
  },
];

export const deviceOnboardingTableHeaderTenant = [
  {
    name: "Device Type",
    field: "assetsType",
  },

  {
    name: "Device Account",
    field: "deviceOnboardingAccount",
  },
  {
    name: "Device User",
    field: "deviceOnboardingUser",
  },
  {
    name: "Device IMEI No",
    field: "deviceOnboardingIMEINumber",
  },
];

export const insertDeviceOnboardingField = (data?: any) => {
  return {
    deviceOnboardingAccount: {
      value:
        data?.deviceOnboardingAccount?._id ??
        (data?.deviceOnboardingAccount?.accountName || ""),
      error: "",
    },

    locationId: {
      value: "",
      error: "",
    },

    deviceOnboardingSimNo: {
      value: "",
      error: "",
    },
    businessModel: {
      value: "",
      error: "",
    },
    createdBy: {
      value: store.getState().auth.userName,
      error: "",
    },
    deviceOnboardingStatus: {
      value: data?.deviceOnboardingStatus ?? "",
      error: "",
    },
    deviceOnboardingIMEINumber: {
      value: data?.deviceOnboardingIMEINumber ?? "",
      error: "",
    },
  } as any;
};
