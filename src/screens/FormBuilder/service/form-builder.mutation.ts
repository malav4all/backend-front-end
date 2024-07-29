import { gql } from "@apollo/client";

export const ADD_FORM_BUILDER = gql`
  mutation ($input: CreateFormBuilderInput!) {
    addFormBuilder(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_FORM_BUILDER = gql`
  mutation ($input: FormBuildInput!) {
    fetchFormBuilder(input: $input) {
      success
      message
      data {
        accountId
        formTitle
        fields {
          id
          label
          required
          type
        }
        createdBy
        isFormEnable
      }
    }
  }
`;
