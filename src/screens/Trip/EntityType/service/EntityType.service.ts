import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_ENTITY_TYPE,
  CHECK_EXITS_INDUSTRY,
  FETCH_CUSTOMER_MODULE,
  FETCH_ENTITY_TYPE,
  SEARCH_INDUSTRY_MODULE,
} from "./EntityType.mutation";

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

export const addEntityType = async (data: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_ENTITY_TYPE,
      variables: data,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchEntityTypeTableHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ENTITY_TYPE,
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

export const checkExitsEntityType = async (variables: any): Promise<any> => {
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
