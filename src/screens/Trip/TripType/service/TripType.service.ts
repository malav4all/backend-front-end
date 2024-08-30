import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_TRIP_TYPE,
  CHECK_EXITS_INDUSTRY,
  FETCH_TRIP_TYPE,
  SEARCH_TRIP_TYPE,
  UPDATE_TRIP_TYPE,
} from "./TripType.mutation";

export const addTripType = async (data: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_TRIP_TYPE,
      variables: data,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateTripType = async (data: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_TRIP_TYPE,
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
      mutation: FETCH_TRIP_TYPE,
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
      mutation: SEARCH_TRIP_TYPE,
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
