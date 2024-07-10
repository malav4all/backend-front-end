import { gql } from "@apollo/client";

export const ADD_FORM_BUILDER = gql`
  mutation ($input: CreateFormBuilderInput!) {
    addFormBuilder(input: $input) {
      success
      message
    }
  }
`;
