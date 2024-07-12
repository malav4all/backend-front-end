import { client } from "../../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../../core-services/rest-api";
import { ADD_FORM_BUILDER } from "./form-builder.mutation";

export const addFormBuilder = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: ADD_FORM_BUILDER,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
