import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/rest-api";
import {
  CREATE_TRIP,
  FETCH_ENTITY,
  FETCH_GEOZONE,
  GET_ALL_DEVICE,
} from "./AddTrip.mutation";

export const fetchDeviceList = async (variables: any): Promise<any> => {
  try {
    console.log({ variables });
    const response = await client.mutate({
      mutation: GET_ALL_DEVICE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchGeozoneHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_GEOZONE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchEntityByTripTypeAndType = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ENTITY,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const createTrip = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CREATE_TRIP,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
