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
  mutation ($input: CreateTripTypeInput!) {
    createTripType(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_TRIP_TYPE = gql`
  mutation ($input: TripTypeInput!) {
    tripTypeList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        accountId
        tripName
        minBatteryPercentage
        tripRate
        disableField
        filtrationFelid
        gstPercentage
        createdBy
      }
    }
  }
`;

export const SEARCH_INDUSTRY_MODULE = gql`
  mutation ($input: SearchTripTypeInput!) {
    searchTripType(input: $input) {
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
  mutation ($input: checkExitTripTypeInput!) {
    checkTripTypeExistsRecord(input: $input) {
      success
      message
    }
  }
`;
