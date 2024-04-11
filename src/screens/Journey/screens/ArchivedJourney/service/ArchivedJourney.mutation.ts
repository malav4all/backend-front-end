import { gql } from "@apollo/client";

export const ARCHIVE_JOURNEY = gql`
  mutation {
    archiveJourney {
      data {
        journeyName
        createdBy
        startDate
        endDate
        totalDistance
        totalDuration
      }
    }
  }
`;
