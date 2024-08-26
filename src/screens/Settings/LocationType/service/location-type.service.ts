import { ApolloError } from "@apollo/client";
import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/rest-api";
import {
  ADD_LOCATION_TYPE,
  FETCH_LOCATION_TYPE,
  SEARCH_LOCATION,
} from "./location-type.mutation";

export const fetchLocationType = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_LOCATION_TYPE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const createLocationType = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_LOCATION_TYPE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    if (error.networkError) {
      const resultErrors = error.networkError.result?.errors;
      if (resultErrors && resultErrors.length > 0) {
        const graphqlError = resultErrors[0];
        const message = graphqlError.message || "An error occurred";
        const statusCode = graphqlError.extensions?.code || "Unknown code";
        throw new Error(`Error ${statusCode}: ${message}`);
      }
    }

    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchLocations = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_LOCATION,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
