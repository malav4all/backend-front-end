import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import {
  ADD_ALERT_CONFIG,
  ALERT_TABLE_CONFIG_DATA,
  SEARCH_TABLE_CONFIG_DATA,
  UPDATE_ALERT_CONFIG,
} from "./alert.mutation";

export const addAlertConfigRecord = async (variable: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_ALERT_CONFIG,
      variables: variable,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const listAlertRecord = async (variable: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ALERT_TABLE_CONFIG_DATA,
      variables: variable,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchAlertRecord = async (variable: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_TABLE_CONFIG_DATA,
      variables: variable,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateAlertRecord = async (variable: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_ALERT_CONFIG,
      variables: variable,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
