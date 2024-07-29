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

export const ADD_USER_ACCESS = gql`
  mutation ($input: CreateUserAccessInput!) {
    addUserAccess(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_USER_ACCESS = gql`
  mutation ($input: UserAccessInput!) {
    fetchUserAccess(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        userId
        devicesImei
        entites
        deviceGroup
        createdBy
      }
    }
  }
`;

export const SEARCH_INDUSTRY_MODULE = gql`
  mutation ($input: SearchUserAccessInput!) {
    searchUserAccess(input: $input) {
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
  mutation ($input: checkExitUserAccessInput!) {
    checkUserAccessExistsRecord(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_USER_ACCOUNT_WISE = gql`
  mutation ($input: AccountIdInput!) {
    fetchUserAccountWise(input: $input) {
      success
      message
      data {
        _id
        firstName
      }
    }
  }
`;
