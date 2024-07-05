
import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import { store } from "../../../../utils/store";
import {
  ADD_DEVICE_ONBOARDING,
  FETCH_ACCOUNT,
  FETCH_DEVICE_MODEL,
  FETCH_DEVICE_ONBOARDING,
  FETCH_DEVICE_ONBOARDING_TENANT,
  FILTER_RECORD,
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
      mutation: store.getState().auth.tenantId
        ? FETCH_DEVICE_ONBOARDING_TENANT
        : FETCH_DEVICE_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
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
