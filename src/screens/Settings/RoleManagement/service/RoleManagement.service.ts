import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_ROLE,
  CHECK_EXITS_ROLE,
  FETCH_INDUSTRY_TYPE,
  FETCH_INDUSTRY_TYPE_WITH_CODE,
  FETCH_ROLE,
  SEARCH_ROLE,
  UPDATE_ROLE,
} from "./RoleManagement.mutation";

export const fetchIndustryType = async (variables: any): Promise<any> => {
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

export const fetchIndustryTypeWithCode = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_INDUSTRY_TYPE_WITH_CODE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const addRole = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_ROLE,
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

export const updateRole = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_ROLE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchRole = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_ROLE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const checkExitsRole = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CHECK_EXITS_ROLE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
