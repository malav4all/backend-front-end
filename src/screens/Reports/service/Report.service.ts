import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/graphql/service-response";
import {
  ALERT_TABLE_DATA,
  DEVICE_STATUS,
} from "../../Dashboard/service/Dashboard.mutation";

export const alertRowData = async (variable: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ALERT_TABLE_DATA,
      variables: variable,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const statusDevice = async (variable: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: DEVICE_STATUS,
      variables: variable,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};