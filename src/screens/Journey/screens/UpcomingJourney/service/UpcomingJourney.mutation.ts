import { gql } from "@apollo/client";

export const FETCH_UPCOMING_JOURNEY = gql`
  mutation {
    upComingJourney {
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
