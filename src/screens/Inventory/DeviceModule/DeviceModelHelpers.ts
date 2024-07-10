export const deviceModuleInsertField = (data?: any) => {
  return {
    deviceModelName: {
      value: data?.deviceModelName ?? "",
      error: "",
    },

    deviceModel: {
      value: data?.deviceModel ?? "",
      error: "",
    },

    deviceModelIpAddress: {
      value: data?.deviceModelIpAddress ?? "",
      error: "",
    },

    deviceModelPortNumber: {
      value: data?.deviceModelPortNumber ?? "",
      error: "",
    },

    deviceModelSimCount: {
      value: data?.deviceModelSimCount ?? "",
      error: "",
    },

    deviceModelNetworkType: {
      value: data?.deviceModelNetworkType ?? "",
      error: "",
    },

    deviceModelParser: {
      value: data?.deviceModelParser ?? "",
      error: "",
    },
    deviceCommandKey: {
      value: "",
      error: "",
    },
    deviceCommandValue: {
      value: "",
      error: "",
    },

    deviceConfigKey: {
      value: "",
      error: "",
    },
    deviceConfigValue: {
      value: "",
      error: "",
    },
    deviceModelType: {
      value: data?.deviceModelType ?? "",
      error: "",
    },
  } as any;
};

export const deviceModelTableHeader = [
  {
    name: "Device Id",
    field: "deviceId",
  },
  {
    name: "Device Model Name",
    field: "deviceModelName",
  },
  {
    name: "Device Model",
    field: "deviceModel",
  },
  {
    name: "Device Model Ip Address",
    field: "deviceModelIpAddress",
  },
  {
    name: "Device Model port number",
    field: "deviceModelPortNumber",
  },
  {
    name: "Device Model sim number",
    field: "deviceModelSimCount",
  },
  {
    name: "Device Model Network Type",
    field: "deviceModelNetworkType",
  },
  {
    name: "Action",
    field: "action",
    align: "center",
  },
];
