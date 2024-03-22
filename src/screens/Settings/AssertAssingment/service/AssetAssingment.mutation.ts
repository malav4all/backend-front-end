import { gql } from "@apollo/client";

export const ADD_ASSET_ONBOARDING = gql`
  mutation ($input: CreateAssertAssingmentModuleInput!) {
    createAssertAssingmentModule(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ASSET_ONBOARDING = gql`
  mutation ($input: AssertAssingmentModuleInput!) {
    fetchAssertAssingmentModule(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        imei
        labelName
        boxSet
        createdBy
      }
    }
  }
`;

export const UPDATE_ASSET_ONBOARDING = gql`
  mutation ($input: UpdateAssertAssingmentModuleInput!) {
    updateAssertAssingmentModule(input: $input) {
      success
      message
    }
  }
`;

export const SEARCH_ASSET = gql`
  mutation ($input: SearchAssertAssingmentModuleInput!) {
    searchAssertAssingmentModule(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        imei
        labelName
        boxSet
        createdBy
      }
    }
  }
`;