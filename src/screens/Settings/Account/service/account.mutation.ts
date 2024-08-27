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
        accountPanNo
        accountId
        accountGstNo
        accountAadharNo
        accountState
        accountAddress
        accountCity
        remarks
        accountAuthMobile
        deviceOnboardingIMEINumberCount
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
        accountAddress
        accountContactName
        accountContactEmail
        accountContactMobile
        tenantId
        accountPanNo
        accountId
        accountGstNo
        accountAadharNo
        accountState
        accountAddress
        accountCity
        remarks
        accountAuthMobile
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
