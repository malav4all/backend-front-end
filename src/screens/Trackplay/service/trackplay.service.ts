import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import { FETCH_TRACKPLAY_DATA } from "./trackplay.mutation";

export const fetchTrackplayHandler = async (): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_TRACKPLAY_DATA,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
