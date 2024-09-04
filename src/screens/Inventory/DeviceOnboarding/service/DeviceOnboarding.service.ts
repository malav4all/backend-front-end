import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import { store } from "../../../../utils/store";
import {
  ADD_DEVICE_ONBOARDING,
  BULK_DEVICE_ASSIGNMENT,
  FETCH_ACCOUNT,
  FETCH_DEVICE_MODEL,
  FETCH_DEVICE_ONBOARDING,
  FETCH_GEOZONE,
  FILTER_RECORD,
  SEARCH_DEVICE_ONBOARDING,
  UPDATE_DEVICE_ONBOARDING,
} from "./DeviceOnboarding.mutation";

export const addDeviceOnboarding = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_DEVICE_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchDeviceOnboardingTableHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
    if (error.networkError) {
      const resultErrors = error.networkError.result?.errors;
      if (resultErrors && resultErrors.length > 0) {
        const graphqlError = resultErrors[0];
        const message = graphqlError.message || "An error occurred";
        const statusCode = graphqlError.extensions?.code || "Unknown code";
        throw new Error(`Error ${statusCode}: ${message}`);
      }
    }

    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchAccountHandler = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ACCOUNT,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchDeviceOnboardingHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_DEVICE_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const filterRecord = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FILTER_RECORD,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchDeviceModelList = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_MODEL,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateDeviceOnboardingList = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_DEVICE_ONBOARDING,
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

export const bulkDeviceUpload = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: BULK_DEVICE_ASSIGNMENT,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
