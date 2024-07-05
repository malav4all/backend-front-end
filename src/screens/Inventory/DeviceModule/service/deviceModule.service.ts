import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_DEVICE_MODULE,
  FETCH_DEVICE_MODULE,
  SEARCH_DEVICE_MODULE,
  UPDATE_DEVICE_MODEL,
} from "./deviceModule.mutation";

export const addDeviceModel = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_DEVICE_MODULE,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchDeviceModelTableHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_MODULE,
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
      mutation: SEARCH_DEVICE_MODULE,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const deviceModelUpdate = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_DEVICE_MODEL,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
