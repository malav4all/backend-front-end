import { gql } from "@apollo/client";

export const ADD_DEVICE_MODULE = gql`
  mutation ($input: CreateDeviceModelInput!) {
    createDeviceModel(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_DEVICE_MODULE = gql`
  mutation ($input: DeviceModelInput!) {
    fetchDeviceModel(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        deviceId
        deviceModelName
        deviceModel
        deviceModelType
        deviceModelIpAddress
        deviceModelPortNumber
        deviceModelParser
        deviceModelSimCount
        deviceModelNetworkType
        deviceModelConfig {
          key
          value
        }
        deviceModelCommands {
          key
          value
        }
      }
    }
  }
`;

export const SEARCH_DEVICE_MODULE = gql`
  mutation ($input: SearchDeviceModel!) {
    searchDeviceModel(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        deviceId
        deviceModel
        deviceModelName
        deviceModelType
        deviceModelIpAddress
        deviceModelPortNumber
        deviceModelSimCount
        deviceModelNetworkType
      }
    }
  }
`;

export const UPDATE_DEVICE_MODEL = gql`
  mutation ($input: UpdateDeviceModelInput!) {
    updateDeviceModel(input: $input) {
      success
      message
    }
  }
`;
