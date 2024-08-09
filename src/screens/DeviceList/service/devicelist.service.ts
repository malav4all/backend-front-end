import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import { DEVICE_LIST, UPDATE_DEVICE_NAME } from "./devicelist.mutation";

export const fetchDeviceList = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: DEVICE_LIST,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateDeviceName = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_DEVICE_NAME,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
