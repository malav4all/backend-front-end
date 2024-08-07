import { gql } from "@apollo/client";

export const ADD_FORM_BUILDER = gql`
  mutation ($input: CreateFormBuilderInput!) {
    addFormBuilder(input: $input) {
      success
      message
      data {
        formId
      }
    }
  }
`;

export const UPDATE_FORM_BUILDER = gql`
  mutation ($input: UpdateFormBuilderInput!) {
    updateFormBuilder(input: $input) {
      success
      message
      data {
        formId
      }
    }
  }
`;

export const FETCH_FORM_BUILDER = gql`
  mutation ($input: FormBuildInput!) {
    fetchFormBuilder(input: $input) {
      success
      message
      data {
        formId
        accountId
        name
        description
        content
        createdBy
        updatedBy
        published
      }
    }
  }
`;
