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
    name: "Mobile No",
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
];

export const insertUserField = (data?: any) => {
  return {
    alertName: {
      value: data?.alertName ?? "",
      error: "",
    },
    imei: {
      value: data?.imei ?? "",
      error: "",
    },
    mobileNo: {
      value: data?.mobileNo ?? "",
      error: "",
    },
    startDate: {
      value: data?.mobileNo ?? "",
      error: "",
    },
    endDate: {
      value: data?.mobileNo ?? "",
      error: "",
    },
  } as any;
};

export const validateAddUserForm = (userFormFields: any, edit = false) => {
  let isValid = true;
  let errors: any = { ...userFormFields };
  if (!errors?.firstName?.value) {
    errors.firstName.error = "Please enter first name";
    isValid = false;
  }

  if (!errors?.lastName?.value) {
    errors.lastName.error = "Please enter last name";
    isValid = false;
  }

  if (!errors?.email?.value) {
    errors.email.error = "Please enter email";
    isValid = false;
  }

  if (!errors.mobileNumber.value) {
    errors.mobileNumber.error = "Please enter a mobile number";
    isValid = false;
  }
  if (errors.mobileNumber.value) {
    const re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!re.test(errors.mobileNumber.value)) {
      errors.mobileNumber.error = "Mobile Number must be of 10 digits!";
      isValid = false;
    }
  }

  if (!errors?.userName?.value) {
    errors.userName.error = "Please enter username";
    isValid = false;
  }

  if (!errors?.password?.value) {
    errors.password.error = "Please enter password";
    isValid = edit;
  }

  if (!errors?.roleId?.value) {
    errors.roleId.error = "Please select role";
    isValid = false;
  }

  if (!errors?.status?.value) {
    errors.status.error = "Please select status";
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
