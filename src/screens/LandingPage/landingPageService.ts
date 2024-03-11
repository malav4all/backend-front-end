import { client } from "../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../core-services/graphql/service-response";
import {
  CHANGESTATUS,
  FORGETPASSWORD,
  LOGIN,
  LOGOUT,
  MOBILENOVERIFY,
  OTP_LOGIN,
  SENDOTP,
  VERIFYOTP,
} from "./login-mutation";

export const onLogin = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: LOGIN,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const changeStatus = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CHANGESTATUS,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const onLogout = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: LOGOUT,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const mobileNumberExist = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: MOBILENOVERIFY,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const sendOtp = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SENDOTP,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const otpVerify = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: VERIFYOTP,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const forgetPassword = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FORGETPASSWORD,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const otpLogin = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: OTP_LOGIN,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
