import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import {
  FILTER_IMEI_ACCOUNT_ID,
  TRANSFER_IMEI_TO_ACCOUNT,
} from "./device-transfer.mutation";

export const filterImeiWithAccountId = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FILTER_IMEI_ACCOUNT_ID,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const transferImeiWithOtherAccount = async (
  variables: any
): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: TRANSFER_IMEI_TO_ACCOUNT,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
