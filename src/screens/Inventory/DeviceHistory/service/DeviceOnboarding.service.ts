import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  FETCH_DEVICE_ONBOARDING_HISTORY,
  FETCH_DEVICE_SIM_HISTORY,
} from "./DeviceOnboardingHistory.mutation";

export const fetchDeviceOnboardingHistory = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_ONBOARDING_HISTORY,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchDeviceSimHistory = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_SIM_HISTORY,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
