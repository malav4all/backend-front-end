import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/graphql/service-response";
import { FETCH_DASHBOARD_DETAIL } from "./Dashboard.mutation";

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
