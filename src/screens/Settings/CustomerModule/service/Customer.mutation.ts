import { gql } from "@apollo/client";

export const CREATE_CUSTOMER_MODULE = gql`
  mutation ($input: CreateCustomerModuleInput!) {
    createCustomerModule(input: $input) {
      success
      message
    }
  }
`;

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
        description
      }
    }
  }
`;

export const SEARCH_CUSTOMER_MODULE = gql`
  mutation ($input: SearchInput!) {
    searchCustomerModule(input: $input) {
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

export const CHECK_EXITS_CUSTOMER_MODULE = gql`
  mutation ($input: CustomerModuleExitsInput!) {
    checkCustomerModuleExistsRecord(input: $input) {
      success
      message
    }
  }
`;
