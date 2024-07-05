import { gql } from "@apollo/client";

export const ADD_DEVICE_ONBOARDING = gql`
  mutation ($input: DeviceOnboardingInput!) {
    createDeviceOnboarding(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_DEVICE_ONBOARDING = gql`
  mutation ($input: DeviceOnboardingFetchInput!) {
    fetchDeviceOnboardingList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        assetsType
        description
        deviceOnboardingName
        deviceOnboardingSimNo
        deviceOnboardingIMEINumber
        deviceOnboardingStatus
        deviceOnboardingModel {
          _id
          deviceModelName
        }
        deviceOnboardingAccount {
          _id
          accountName
        }
        deviceOnboardingUser {
          _id
          firstName
        }
      }
    }
  }
`;

export const FETCH_DEVICE_ONBOARDING_TENANT = gql`
  mutation ($input: DeviceOnboardingFetchInput!) {
    fetchDeviceOnboardingList(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        assetsType
        deviceOnboardingIMEINumber
        deviceOnboardingAccount {
          _id
          accountName
        }
        deviceOnboardingUser {
          _id
          firstName
        }
      }
    }
  }
`;

export const FETCH_ACCOUNT = gql`
  mutation ($input: AccountModuleInput!) {
    fetchAccountModuleList(input: $input) {
      success
      message
      data {
        _id
        accountName
        tenantId
        industryType {
          _id
        }
      }
    }
  }
`;

export const FILTER_RECORD = gql`
  mutation ($input: DeviceOnboardingAccountIdInput!) {
    filterRecordUerAccountId(input: $input) {
      _id
      firstName
      userName
    }
  }
`;

export const FETCH_DEVICE_MODEL = gql`
  mutation ($input: DeviceModelInput!) {
    fetchDeviceModel(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        deviceModelName
      }
    }
  }
`;

export const UPDATE_DEVICE_ONBOARDING = gql`
  mutation ($input: UpdateDeviceOnboardingInput!) {
    updateDeviceOnboarding(input: $input) {
      success
      message
    }
  }
`;
