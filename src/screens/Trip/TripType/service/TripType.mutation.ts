import { gql } from "@apollo/client";

export const ADD_TRIP_TYPE = gql`
  mutation ($input: CreateTripTypeInput!) {
    createTripType(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_TRIP_TYPE = gql`
  mutation ($input: UpdateTripTypeInput!) {
    updateTripType(input: $input) {
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

export const SEARCH_TRIP_TYPE = gql`
  mutation ($input: SearchTripTypeInput!) {
    searchTripType(input: $input) {
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

export const CHECK_EXITS_INDUSTRY = gql`
  mutation ($input: checkExitTripTypeInput!) {
    checkTripTypeExistsRecord(input: $input) {
      success
      message
    }
  }
`;
