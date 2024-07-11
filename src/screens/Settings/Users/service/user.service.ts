import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_USER,
  CHANGE_PASSWORD,
  FETCH_ACCOUNT,
  FETCH_ROLE,
  FETCH_USER,
  SEARCH_USER,
  UPDATE_USER,
} from "./user.mutation";

export const fetchAccountHandler = async (variables: any): Promise<any> => {
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

export const fetchUserDataHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_USER,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const createUser = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_USER,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateUser = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_USER,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchRole = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ROLE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const changePassword = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CHANGE_PASSWORD,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchUser = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_USER,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
