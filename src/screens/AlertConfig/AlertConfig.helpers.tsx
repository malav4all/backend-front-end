export const alertConfigTableHeader = [
  {
    name: "Name",
    field: "name",
  },
  {
    name: "Device Group",
    field: "deviceGroupName",
  },

  {
    name: "Selected Device",
    field: "userSelectedImei",
  },

  {
    name: "Mobile Number",
    field: "mobileNo",
  },

  {
    name: "Alert Enable",
    field: "isAlertDisable",
  },

  {
    name: "Created By",
    field: "createdBy",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const insertUserField = (data?: any) => {
  return {
    alertName: {
      value: data?.alertName ?? "",
      error: "",
    },
    mobileNo: {
      value: data?.mobileNo ?? "",
      error: "",
    },
    deviceGroup: {
      value: data?.deviceGroupInput ?? "",
      error: "",
    },
    deviceName:{
      value: data?.deviceName ?? "",
      error: ""
    },
    eventName: {
      value: data?.eventName ?? "",
      error: ""
    },
    startLocation: {
      value: data?.startLocation ?? "",
      error: "",
    },
    startDate: {
      value: data?.startDate ?? "",
      error: "",
    },
    endDate: {
      value: data?.endDate ?? "",
      error: "",
    },
    startAlertTime: {
      value: data?.startAlertTime ?? "",
      error: "",
    },
    endAlertTime: {
      value: data?.endAlertTime ?? "",
      error: "",
    },
  } as any;
};

export const validateAddFilterForm = (
  userFormFields: any,
  alertDataInput: any,
  isDeviceAlert: any,
  edit = false
) => {
  let isValid = true;
  let errors: any = { ...userFormFields };

  if (!errors?.alertName?.value) {
    errors.alertName.error = "Please enter Alert Name";
    isValid = false;
  }

  if (!errors?.mobileNo?.value) {
    errors.mobileNo.error = "Please enter Mobile Number";
    isValid = false;
  } else {
    const re = /^\d{10}$/;
    if (!re.test(errors.mobileNo.value)) {
      errors.mobileNo.error = "Mobile Number must be of 10 digits!";
      isValid = false;
    }
  }

  if (!errors?.deviceGroup?.value) {
    errors.deviceGroup.error = "Please select device group";
    isValid = false;
  }

  if (!errors?.deviceName?.value) {
    errors.deviceName.error = "Please select device Name";
    isValid = false;
  }

  if (!errors?.eventName?.value) {
    errors.eventName.error = "Please select Event";
    isValid = false;
  }

  const eventName = errors.eventName.value;
  const requiresLocationValidation = eventName === ["geo_in", "geo_out"].includes(eventName);

  if (requiresLocationValidation && !errors.startLocation.value) {
    errors.startLocation.error = "Please select a location";
    isValid = false;
  }

  const requiresDateAndTimeValidation = eventName === ["locked", "unlocked","other"].includes(eventName);
  if (requiresDateAndTimeValidation && !errors.startDate.value) {
    errors.startDate.error = "Please select start date";
    isValid = false;
  }

  if (requiresDateAndTimeValidation && !errors.endDate.value) {
    errors.endDate.error = "Please select end date";
    isValid = false;
  }

  if (requiresDateAndTimeValidation && !errors.endAlertTime.value) {
    errors.endAlertTime.error = "Please select end time";
    isValid = false;
  }

  if (requiresDateAndTimeValidation && !errors.startAlertTime.value) {
    errors.startAlertTime.error = "Please select start time";
    isValid = false;
  }

  return { isValid, errors };
};

export interface UserData {
  name: JSX.Element;
  imei: string;
  geozoneIn: number;
  geozoneOut: string;
}
