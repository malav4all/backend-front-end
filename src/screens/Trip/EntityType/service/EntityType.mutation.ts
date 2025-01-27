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

export const ADD_ENTITY_TYPE = gql`
  mutation ($input: CreateEntityTypeInput!) {
    addEntityType(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_ENTITY_TYPE = gql`
  mutation ($input: UpdateEntityTypeInput!) {
    updateEntityType(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ENTITY_TYPE = gql`
  mutation ($input: EntityTypeInput!) {
    fetchEntityType(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        name
        createdBy
        description
      }
    }
  }
`;

export const SEARCH_INDUSTRY_MODULE = gql`
  mutation ($input: SearchEntityInput!) {
    searchEntity(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        name
        createdBy
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
