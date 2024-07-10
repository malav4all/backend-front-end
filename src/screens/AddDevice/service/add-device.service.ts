import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import {
  ADD_DEVICE,
  BULK_DEVICE_UPLOAD,
  FETCH_ADD_DEVICE_LIST,
  SEARCH_DEVICE_LIST,
  UPDATE_DEVICE_LIST,
} from "./add-device.mutation";

export const addDeviceList = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_DEVICE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchDeviceList = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ADD_DEVICE_LIST,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchDeviceList = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_DEVICE_LIST,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateDevice = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_DEVICE_LIST,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const bulkRoutesDeviceList = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: BULK_DEVICE_UPLOAD,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
