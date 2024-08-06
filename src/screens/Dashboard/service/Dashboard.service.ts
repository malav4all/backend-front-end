import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/graphql/service-response";
import {
  ALERT_TABLE_DATA,
  DEVICE_STATUS,
  FETCH_DASHBOARD_DETAIL,
  FETCH_DEVICE_STATUS,
  LINE_CHART_DEVICE_GRAPH,
  OFFLINE_DEVICE_GRAPH,
  ONLINE_DEVICE_GRAPH,
} from "./Dashboard.mutation";

export const fetchDashboardDetail = async (): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DASHBOARD_DETAIL,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

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

export const getAllDeviceStatus = async (): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_STATUS,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const onlineGraphStatus = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ONLINE_DEVICE_GRAPH,
      variables: variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const offlineGraphStatus = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: OFFLINE_DEVICE_GRAPH,
      variables: variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const lineChartGraphStatus = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: LINE_CHART_DEVICE_GRAPH,
      variables: variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
