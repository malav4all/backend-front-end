import { gql } from "@apollo/client";

export const ADD_JOURNEY = gql`
  mutation ($input: CreateJourneyInput!) {
    addJourney(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_JOURNEY = gql`
  mutation ($input: JourneyInput!) {
    fetchJourney(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        journeyName
        startDate
        endDate
        journeyData {
          _id
          name
          description
          locationType
          mobileNumber
          finalAddress
          address {
            country
            state
            city
            area
            district
            zipCode
          }
          geoCodeData {
            type
            geometry {
              type
              coordinates
              radius
            }
          }
        }
        createdBy
      }
    }
  }
`;
