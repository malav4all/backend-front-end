import { PhoneNumberUtil } from "google-libphonenumber";
import strings from "../../../global/constants/StringConstants";
import { getFormattedNumbers } from "../../../helpers/methods";
import {
  ForgotPasswordFields,
  LoginFields,
  RegistrationFeild,
} from "./../../../models/interfaces";

export const loginForm = () => {
  return {
    email: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  } as LoginFields;
};

export const loginValidation = (loginUserData: any) => {
  let errors = loginUserData;
  let isValid = true;
  const email = loginUserData.email.value;
  const password = loginUserData.password.value;
  if (!email) {
    errors.email.error = "Please enter your email id";
    isValid = false;
  }
  if (!password) {
    errors.password.error = "Please enter your password";
    isValid = false;
  }
  return { isValid, errors };
};

export const forgotPasswordValue = () => {
  return {
    mobileNumber: {
      value: "",
      error: "",
    },
    otp: {
      value: "",
      error: "",
    },
  } as any;
};

export const forgotPasswordValidation = (forgotUserData: any) => {
  const errors = forgotUserData;
  let isValid = true;
  let mobileNumberValue = forgotUserData.mobileNumber.value;
  if (!mobileNumberValue) {
    errors.mobileNumber.error = "Please enter mobile number";
    isValid = false;
  }
  const mobileNumberRegex = /^[0-9]{10}$/;
  if (!mobileNumberRegex.test(mobileNumberValue)) {
    errors.mobileNumber.error = "Please enter a valid 10-digit mobile number";
    isValid = false;
  }

  return { isValid, errors };
};

export const otpVerifyValidation = (forgotUserData: any) => {
  const errors = forgotUserData;
  let isValid = true;
  let otp = forgotUserData?.otp?.value;
  if (!otp) {
    errors.otp.error = "Please enter otp";
    isValid = false;
  }

  return { isValid, errors };
};

export const registerFormField = () => {
  return {
    firstName: {
      value: "",
      error: "",
    },
    lastName: {
      value: "",
      error: "",
    },
    company: {
      value: "",
      error: "",
    },
    email: {
      value: "",
      error: "",
    },
    contact: {
      value: "",
      error: "",
    },
    password: {
      value: "",
      error: "",
    },
  } as RegistrationFeild;
};

const isPhoneValid = (phone: string) => {
  try {
    const phoneUtil = PhoneNumberUtil.getInstance();
    return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
  } catch (error: any) {
    return false;
  }
};
export const registrationValidation = (registerUserValue: any) => {
  let errors = registerUserValue;
  let isValid = true;
  const firstName = registerUserValue.firstName.value;
  const lastName = registerUserValue.lastName.value;
  const company = registerUserValue.company.value;
  const email = registerUserValue.email.value;
  const contact = registerUserValue.contact.value;
  const password = registerUserValue.password.value;
  if (!firstName) {
    errors.firstName.error = "Please enter first name";
    isValid = false;
  }
  if (!lastName) {
    errors.lastName.error = "Please enter last name";
    isValid = false;
  }
  if (!email) {
    errors.email.error = "Please enter email";
    isValid = false;
  }
  if (!company) {
    errors.company.error = "Please enter company name";
    isValid = false;
  }
  if (!isPhoneValid(contact)) {
    errors.contact.error = "Please enter valid contact no";
    isValid = false;
  }
  if (!password) {
    errors.password.error = "Please enter password";
    isValid = false;
  }
  if (!strings.passwordValidationRegex.test(password)) {
    errors.password.error =
      "Please enter a password that is at least 8 characters long and includes at least one digit, one lowercase letter, one uppercase letter, and one special character from the following: @ $ ! % * ? & #.";
    isValid = false;
  }

  if (!strings.regex.test(email)) {
    errors.email.error = "Please enter valid email id";
    isValid = false;
  }

  return { isValid, errors };
};
