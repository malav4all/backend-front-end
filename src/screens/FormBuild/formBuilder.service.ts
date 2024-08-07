// import { ADD_FORM_BUILDER, FETCH_FORM_BUILDER } from "./form-builder.mutation";

import { client } from "../../core-services/graphql/apollo-client";
import { ServiceResponse } from "../../core-services/rest-api";
import {
  ADD_FORM_BUILDER,
  FETCH_FORM_BUILDER,
  UPDATE_FORM_BUILDER,
} from "./form-builder.mutation";

export const createForm = async (variables: any): Promise<any> => {
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

export const UpdateForm = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: UPDATE_FORM_BUILDER,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};

export const GetForms = async (variables: any): Promise<any> => {
  try {
    const response = await client.mutate({
      mutation: FETCH_FORM_BUILDER,
      variables,
    });

    return response.data;
  } catch (error: any) {
    throw new ServiceResponse<any>(0, error.message, undefined);
  }
};
