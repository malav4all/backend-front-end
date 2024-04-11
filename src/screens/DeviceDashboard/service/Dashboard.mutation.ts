import { gql } from "@apollo/client";

export const FETCH_DASHBOARD_DETAIL = gql`
  mutation {
    fetchDashboardDetail {
      data {
        totalUser
        totalJourney
        ongoingJourney
      }
    }
  }
`;

export const GET_ALL_DEVICE = gql`
  mutation {
    getAllDeviceList {
      imei
      labelName
      _id
      createdBy
    }
  }
`;
