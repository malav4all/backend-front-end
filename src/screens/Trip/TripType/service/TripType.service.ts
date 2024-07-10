import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_INDUSTRY,
  CHECK_EXITS_INDUSTRY,
  FETCH_CUSTOMER_MODULE,
  FETCH_INDUSTRY,
  SEARCH_INDUSTRY_MODULE,
} from "./TripType.mutation";

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

export const addTripType = async (data: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_INDUSTRY,
      variables: data,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchTripTypeTableHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_INDUSTRY,
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

export const checkExitsTripType = async (variables: any): Promise<any> => {
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
