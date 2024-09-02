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
    name: "Model",
    field: "deviceModel",
  },
  {
    name: "Ip Address",
    field: "deviceModelIpAddress",
  },
  {
    name: "Port Number",
    field: "deviceModelPortNumber",
  },
  {
    name: "sim count",
    field: "deviceModelSimCount",
  },
  {
    name: "Network Type",
    field: "deviceModelNetworkType",
  },
  {
    name: "Action",
    field: "action",
    align: "center",
  },
];

export const validateDeviceModelForm = (deviceFields: any) => {
  let isValid = true;
  let errors: any = { ...deviceFields };

  if (!errors?.deviceModelName?.value) {
    errors.deviceModelName.error = "Please enter Device Model Name";
    isValid = false;
  }

  if (!errors?.deviceModel?.value) {
    errors.deviceModel.error = "Please select Device Model";
    isValid = false;
  }

  if (!errors?.deviceModelIpAddress?.value) {
    errors.deviceModelIpAddress.error = "Please enter IP address";
    isValid = false;
  }

  if (!errors?.deviceModelPortNumber?.value) {
    errors.deviceModelPortNumber.error = "Please enter port number";
    isValid = false;
  } else if (isNaN(errors.deviceModelPortNumber.value)) {
    errors.deviceModelPortNumber.error = "Port must be a valid number";
    isValid = false;
  }

  if (!errors?.deviceModelSimCount?.value) {
    errors.deviceModelSimCount.error = "Please select Sim count";
    isValid = false;
  }

  if (!errors?.deviceModelNetworkType?.value) {
    errors.deviceModelNetworkType.error = "Please select network type";
    isValid = false;
  }

  if (!errors?.deviceModelParser?.value) {
    errors.deviceModelParser.error = "Please enter parser name";
    isValid = false;
  }

  return { isValid, errors };
};
