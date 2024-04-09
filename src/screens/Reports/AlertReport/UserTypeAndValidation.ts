import { UserFields } from "../../../models/interfaces";
import { store } from "../../../utils/store";

export const userTableHeader = [
  {
    name: "User",
    field: "user",
  },
  {
    name: "IMEI",
    field: "imei",
  },

  {
    name: "Journey",
    field: "journey",
  },
  {
    name: "Action",
    field: "action",
  },
];

export const initialUserData = {
  email: "",
  newPassword: "",
  confirmPassword: "",
};

export const insertUserField = (data?: any) => {
  return {
    user: {
      value: data?.user ?? "",
      error: "",
    },
    imei: {
      value: data?.imei ?? "",
      error: "",
    },
    journey: {
      value: data?.journey ?? "",
      error: "",
    },
    mobileNumber: {
      value: data?.mobileNumber ?? "",
      error: "",
    },
    userName: {
      value: data?.userName ?? "",
      error: "",
    },
    createdBy: {
      value: store?.getState()?.auth?.userName,
      error: "",
    },
    roleId: {
      value: data?.roleId ?? "",
      error: "",
    },
    status: {
      value: data?.status ?? "Active",
      error: "",
    },
    password: {
      value: data?.password ?? "",
      error: "",
    },
  } as any;
};

export const changePasswordField = () => {
  return {
    newPassword: {
      value: "",
      error: "",
    },
    confirmPassword: {
      value: "",
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

export const updateUserValidation = (data: any) => {
  return {
    emailId: {
      value: data?.emailId,
      error: "",
    },
    assignBy: {
      value: data?.assignBy,
      error: "",
    },
    allowedEmailCount: {
      value: data?.allowedEmailCount,
      error: "",
    },
    title: {
      value: data?.title,
      error: "",
    },
  } as UserFields;
};

export const updateUserValidationForm = (updateUserData: any) => {
  const errors = updateUserData;
  let isValid = true;
  const assignBy = updateUserData.assignBy.value;
  const allowedEmailCount = updateUserData.allowedEmailCount.value;
  const title = updateUserData.title.value;
  if (!assignBy && !allowedEmailCount && !title) {
    errors.assignBy.error = "Please select manager email";
    errors.allowedEmailCount.error = "Please enter allowed email count";
    errors.title.error = "Please enter title";
    isValid = false;
  } else if (!assignBy) {
    errors.assignBy.error = "Please select manager email";
    isValid = false;
  } else if (!allowedEmailCount) {
    errors.allowedEmailCount.error = "Please enter allowed email count";
    isValid = false;
  } else if (!title) {
    errors.title.error = "Please enter title";
    isValid = false;
  }
  return { isValid, errors };
};

export const changePasswordValidationForm = (changePasswordFormFields: any) => {
  const errors = changePasswordFormFields;
  let isValid = true;
  const newPassword = changePasswordFormFields.newPassword.value;
  const confirmPassword = changePasswordFormFields.confirmPassword.value;

  if (!newPassword) {
    errors.newPassword.error = "Please enter new password";
    isValid = false;
  } else if (!confirmPassword) {
    errors.confirmPassword.error = "Please enter confirm password";
    isValid = false;
  }
  return { isValid, errors };
};
