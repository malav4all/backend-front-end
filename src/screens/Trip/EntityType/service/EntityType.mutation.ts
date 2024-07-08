import { gql } from "@apollo/client";

export const FETCH_CUSTOMER_MODULE = gql`
  mutation ($input: CustomerModuleInput!) {
    customerModuleListAll(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        name
      }
    }
  }
`;

export const ADD_INDUSTRY = gql`
  mutation ($input: CreateEntityTypeInput!) {
    createEntityType(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_INDUSTRY = gql`
  mutation ($input: EntityTypeInput!) {
    entityTypeListAll(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        name
        code
        description
        file
      }
    }
  }
`;

export const SEARCH_INDUSTRY_MODULE = gql`
  mutation ($input: SearchEntityTypeInput!) {
    searchEntityType(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        code
        name
        description
      }
    }
  }
`;

export const CHECK_EXITS_INDUSTRY = gql`
  mutation ($input: checkExitEntityTypeInput!) {
    checkEntityTypeExistsRecord(input: $input) {
      success
      message
    }
  }
`;
