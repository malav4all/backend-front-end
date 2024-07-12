import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_USER_ACCESS,
  CHECK_EXITS_INDUSTRY,
  FETCH_CUSTOMER_MODULE,
  FETCH_USER_ACCESS,
  FETCH_USER_ACCOUNT_WISE,
  SEARCH_INDUSTRY_MODULE,
} from "./UserAccess.mutation";

export const fetchTableHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_CUSTOMER_MODULE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const addUserAccess = async (data: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_USER_ACCESS,
      variables: data,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchUserAccessTableHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_USER_ACCESS,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchTableHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_INDUSTRY_MODULE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const checkExitsUserAccess = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CHECK_EXITS_INDUSTRY,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchUserAccountWise = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_USER_ACCOUNT_WISE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
