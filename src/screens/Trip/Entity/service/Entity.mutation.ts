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

export const ADD_ENTITES_TYPE = gql`
  mutation ($input: CreateEntitesInput!) {
    addEntitesType(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_ENTITES_TYPE = gql`
  mutation ($input: UpdateEntitesInput!) {
    updateEntityType(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ENTITTES = gql`
  mutation ($input: EntitesTypeInput!) {
    fetchEntitesType(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        accountId
        tripTypeList
        name
        type
        address
        city
        state
        area
        district
        pinCode
        contactName
        contactPhone
        gstIn
        aadharCardNo
        createdBy
      }
    }
  }
`;

export const SEARCH_ENTITY = gql`
  mutation ($input: SearchEntitesInput!) {
    searchEntity(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        accountId
        tripTypeList
        name
        type
        address
        city
        state
        area
        district
        pinCode
        contactName
        contactPhone
        gstIn
        aadharCardNo
        createdBy
      }
    }
  }
`;

export const CHECK_EXITS_INDUSTRY = gql`
  mutation ($input: checkExitIndustryInput!) {
    checkIndustryExistsRecord(input: $input) {
      success
      message
    }
  }
`;
