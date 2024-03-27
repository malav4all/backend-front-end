import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/graphql/service-response";
import {
  ADD_ASSET_ONBOARDING,
  BULK_JOURNEY_UPLOAD,
  FETCH_ASSET_ONBOARDING,
  SEARCH_ASSET,
  UPDATE_ASSET_ONBOARDING,
} from "./AssetAssingment.mutation";

export const addAssetAssingment = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_ASSET_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchAssetAssingmentTableHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ASSET_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const updateAssetAssingmentList = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_ASSET_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const fetchAssetAssingmentDataHandler = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_ASSET_ONBOARDING,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const searchAssetAssingment = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: SEARCH_ASSET,
      variables,
    });
    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const bulkJourneyUpload = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: BULK_JOURNEY_UPLOAD,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
