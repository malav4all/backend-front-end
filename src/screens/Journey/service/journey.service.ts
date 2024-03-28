import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import {
  ADD_JOURNEY,
  COORDINATES_SUBSCRIPTION,
  FETCH_JOURNEY,
  SEARCH_JOURNEY,
} from "./journey.mutation";

export const createJourney = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_JOURNEY,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchJourney = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_JOURNEY,
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

export const searchJourneys = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_JOURNEY,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
