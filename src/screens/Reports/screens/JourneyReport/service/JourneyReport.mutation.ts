import { gql } from "@apollo/client";

export const GET_ARCHIVE_JOURNEY = gql`
  mutation {
    archiveJourney {
      success
      message
      data {
        _id
        journeyName
        createdBy
        startDate
        endDate
        totalDistance
        totalDuration
        imei
        createdAt
        updatedAt
      }
    }
  }
`;
