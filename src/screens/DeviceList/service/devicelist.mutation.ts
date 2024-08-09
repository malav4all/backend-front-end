import { gql } from "@apollo/client";

export const DEVICE_LIST = gql`
  mutation ($input: DeviceOnboardingFetchInput!) {
    fetchDeviceOnboardingList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        deviceOnboardingSimNo
        deviceOnboardingIMEINumber
        accountId
        deviceName
        createdBy
        location
      }
    }
  }
`;

export const UPDATE_DEVICE_NAME = gql`
  mutation ($input: UpdateDeviceOnboardingInput!) {
    updateDeviceOnboarding(input: $input) {
      success
      message
    }
  }
`;
