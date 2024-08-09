import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import {
  FETCH_TRIP_BY_ID,
  FETCH_TRIP_METRICS,
  GET_ALL_TRIPS,
  SEARCH_DEVICE_GROUP,
} from "./Trip.mutation";

export const fetchTrips = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: GET_ALL_TRIPS,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchTrip = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_DEVICE_GROUP,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchTripMetrics = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_TRIP_METRICS,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchTripbyId = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_TRIP_BY_ID,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
