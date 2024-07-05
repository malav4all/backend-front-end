import { store } from "../../../utils/store";

export const deviceOnboardingTableHeader = [
  {
    name: "Device Type",
    field: "assetsType",
  },
  {
    name: "Device OnboardingName",
    field: "deviceOnboardingName",
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
    name: "Device Onboarding Sim",
    field: "deviceOnboardingSimNo",
  },
  {
    name: "Device Onboarding Model",
    field: "deviceOnboardingModel",
  },
  {
    name: "Status",
    field: "deviceOnboardingStatus",
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
    assetsType: {
      value: data?.assetsType ?? "",
      error: "",
    },
    description: {
      value: data?.description ?? "",
      error: "",
    },
    deviceOnboardingName: {
      value: data?.deviceOnboardingName ?? "",
      error: "",
    },
    deviceOnboardingAccount: {
      value:
        data?.deviceOnboardingAccount?._id ??
        (data?.deviceOnboardingAccount?.accountName || ""),
      error: "",
    },
    deviceOnboardingUser: {
      value:
        data?.deviceOnboardingUser?._id ??
        (data?.deviceOnboardingUser?.firstName || ""),
      error: "",
    },
    deviceOnboardingSimNo: {
      value: "",
      error: "",
    },
    deviceOnboardingModel: {
      value:
        data?.deviceOnboardingModel?._id ??
        (data?.deviceOnboardingModel?.deviceModelName || ""),
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
