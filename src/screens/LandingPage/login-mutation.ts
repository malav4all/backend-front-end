import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($input: LoginUserInput!) {
    loginUser(input: $input) {
      data
    }
  }
`;

export const CHANGESTATUS = gql`
  mutation ($input: ChangeUserStatusInput!) {
    changeUserStatus(input: $input) {
      success
      message
    }
  }
`;

export const LOGOUT = gql`
  mutation Logout($input: LogoutInput!) {
    logoutUser(input: $input)
  }
`;

export const MOBILENOVERIFY = gql`
  mutation ($input: OtpInput!) {
    mobileNumberExists(input: $input) {
      success
      message
    }
  }
`;

export const OTP_LOGIN = gql`
  mutation ($input: VerifyOtpInput!) {
    verifyOtpLogin(input: $input) {
      success
      message
      data
    }
  }
`;

export const SENDOTP = gql`
  mutation ($input: OtpInput!) {
    sendOtp(input: $input) {
      success
      message
    }
  }
`;

export const VERIFYOTP = gql`
  mutation ($input: VerifyOtpInput!) {
    verifyOtp(input: $input) {
      success
      message
    }
  }
`;

export const REFRESH_TOKEN = gql`
  mutation {
    refreshToken
  }
`;

export const FORGETPASSWORD = gql`
  mutation ($input: ChangePasswordInput!) {
    forgetPassword(input: $input) {
      success
      message
    }
  }
`;
