import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/rest-api";
import {
  CHECK_BATTERY,
  CREATE_TRIP,
  FETCH_ENTITY,
  FETCH_GEOZONE,
  GET_ALL_DEVICE,
  UPDATE_TRIP,
  UPLOAD_FILE,
} from "./AddTrip.mutation";

export const fetchDeviceList = async (variables: any): Promise<any> => {
  try {
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

    return response?.data;
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

export const checkBattery = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: CHECK_BATTERY,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fileUpload = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPLOAD_FILE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateTrip = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_TRIP,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
