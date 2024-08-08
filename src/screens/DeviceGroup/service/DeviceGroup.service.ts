import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/graphql/service-response";
import {
  ADD_DEVICE_GROUP,
  FETCH_DEVICE_GROUP,
  GET_ALL_IMEI_LIST,
  SEARCH_DEVICE_GROUP,
  UPDATE_DEVICE_GROUP,
} from "./DeviceGroup.mutation";

export const addDeviceGroup = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_DEVICE_GROUP,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchDeviceGroup = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_GROUP,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateDeviceGroup = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_DEVICE_GROUP,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchDeviceGroup = async (variables: any): Promise<any> => {
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

export const fetchDeviceList = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: GET_ALL_IMEI_LIST,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
