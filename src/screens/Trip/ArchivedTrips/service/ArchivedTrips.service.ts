import { client } from "../../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../../core-services/rest-api";
import { ARCHIVE_JOURNEY } from "./ArchivedTrips.mutation";

export const archiveJourney = async (): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ARCHIVE_JOURNEY,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
