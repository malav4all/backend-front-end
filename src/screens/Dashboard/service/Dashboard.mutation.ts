import { gql } from "@apollo/client";

export const FETCH_DASHBOARD_DETAIL = gql`
  mutation {
    fetchDashboardDetail {
      data {
        totalUser
        totalRoutes
        ongoingRoutes
      }
    }
  }
`;

export const ALERT_TABLE_DATA = gql`
  mutation ($input: AlertInputType!) {
    getAlertData(input: $input) {
      paginatorInfo {
        count
      }
      data {
        lat
        lng
        mode
        source
        event
        imei
        label
        message
        time
      }
    }
  }
`;

export const DEVICE_STATUS = gql`
  mutation ($input: AlertInputType!) {
    getStatusDevice(input: $input) {
      paginatorInfo {
        count
      }
      data {
        lat
        lng
        imei
        label
        status
        time
      }
    }
  }
`;

export const FETCH_DEVICE_STATUS = gql`
  mutation {
    getAllStatusDevice {
      data {
        lat
        lng
        imei
        label
        status
        time
      }
    }
  }
`;

export const ALERTS_SUBSCRIPTION = gql`
  subscription ($topic: String!) {
    alertUpdated(topic: $topic) {
      label
      event
      imei
      message
      lat
      lng
      mode
      source
    }
  }
`;
