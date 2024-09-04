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
  mutation ($input: AlertReportInputType!) {
    getAlertData(input: $input) {
      totalCount
      rowData {
        latitude
        time
        event
        accountId
        alertMessage
        latitude
        longitude
        imei
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

export const DEVICE_DATA = gql`
  subscription ($accountId: String!, $imeis: [String!], $topicType: String!) {
    track(accountId: $accountId, imeis: $imeis, topicType: $topicType)
  }
`;

export const ALERT_DEVICE_DATA = gql`
  subscription ($accountId: String!, $imeis: [String!]) {
    alert(accountId: $accountId, imeis: $imeis)
  }
`;

export const ONLINE_DEVICE_GRAPH = gql`
  mutation ($input: DeviceOnboardingAccountIdInput!) {
    onlineDeviceGraph(input: $input) {
      series
      labels
    }
  }
`;

export const OFFLINE_DEVICE_GRAPH = gql`
  mutation ($input: DeviceOnboardingAccountIdInput!) {
    offlineDeviceGraph(input: $input) {
      series
      labels
    }
  }
`;

export const LINE_CHART_DEVICE_GRAPH = gql`
  mutation ($input: DeviceOnboardingAccountIdInput!) {
    lineGraphDeviceData(input: $input) {
      xaxis {
        categories
      }
      series {
        name
        data
      }
    }
  }
`;

export const DEVICE_DASHBOARD_ONLINE_OFFLINE_COUNT = gql`
  mutation ($input: DeviceOnboardingAccountIdInput!) {
    getOnlineOfflineCount(input: $input) {
      totalDeviceCount
      online
      offline
      data {
        name
        accountId
        imei
        status
        lastPing
        latitude
        longitude
        gps
        batteryPercentage
      }
    }
  }
`;
