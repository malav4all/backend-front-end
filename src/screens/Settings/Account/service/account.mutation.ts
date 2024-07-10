import { gql } from "@apollo/client";

export const ADD_ACCOUNT = gql`
  mutation ($input: CreateAccountInput!) {
    createAccount(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ACCOUNT = gql`
  mutation ($input: AccountInput!) {
    fetchAccountModuleList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        accountName
        accountAddress
        accountContactName
        accountContactEmail
        accountContactMobile
        tenantId
        accountId
        accountConfiguration {
          key
          value
        }
        industryType {
          _id
          name
        }
      }
    }
  }
`;

export const SEARCH_ACCOUNT_MODULE = gql`
  mutation ($input: SearchAccountInput!) {
    searchAccount(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        accountName
        accountContactName
        accountContactEmail
        accountAddress
      }
    }
  }
`;

export const FETCH_INDUSTRY_TYPE = gql`
  mutation ($input: IndustryInput!) {
    industryListAll(input: $input) {
      data {
        _id
        name
        code
      }
    }
  }
`;

export const UPDATE_ACCOUNT = gql`
  mutation ($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      success
      message
    }
  }
`;
