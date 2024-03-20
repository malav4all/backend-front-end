import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/rest-api";
import {
  ADD_LOCATION_TYPE,
  FETCH_LOCATION_TYPE,
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
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
