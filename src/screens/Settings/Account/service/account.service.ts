import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_ACCOUNT,
  FETCH_ACCOUNT,
  FETCH_INDUSTRY_TYPE,
  SEARCH_ACCOUNT_MODULE,
  UPDATE_ACCOUNT,
} from "./account.mutation";

export const addAccount = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_ACCOUNT,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchAccountTableHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ACCOUNT,
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
      mutation: SEARCH_ACCOUNT_MODULE,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchIndustryHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_INDUSTRY_TYPE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateAccount = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_ACCOUNT,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
