import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import { FETCH_DEVICE_MAP } from "./map-mutation";

export const fetchMapViewDevice = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_DEVICE_MAP,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
