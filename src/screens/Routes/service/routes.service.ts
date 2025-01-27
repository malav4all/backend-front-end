import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import {
  ADD_ROUTES,
  BATTERY_GRAPH,
  COORDINATES_SUBSCRIPTION,
  FETCH_ROUTES,
  SEARCH_ROUTES,
  SPEED_GRAPH,
} from "./routes.mutation";

export const createRoutes = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_ROUTES,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchRoutes = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ROUTES,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const viewLiveTracking = async (variables: any): Promise<any> => {
  try {
    const response = await client.subscribe({
      query: COORDINATES_SUBSCRIPTION,
      variables,
    });

    return response;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchRoutess = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_ROUTES,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const speedGraphData = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SPEED_GRAPH,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const batteryGraphData = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: BATTERY_GRAPH,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
