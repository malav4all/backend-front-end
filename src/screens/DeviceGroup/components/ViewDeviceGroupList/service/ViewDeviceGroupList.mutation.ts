import { gql } from "@apollo/client";
export const FETCH_DEVICE_GROUP_BY_ID = gql`
  mutation ($input: DeviceGroupInput!) {
    fetchDeviceGroupById(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        createdBy
        imeiData {
          imei
          labelName
          _id
          boxSet
          journey {
            _id
            totalDuration
            totalDistance
            endDate
            startDate
            createdBy
            journeyName
          }
        }
        deviceGroupName
        updateBy
      }
    }
  }
`;

export const SEARCH_DEVICE_GROUP_BY_ID = gql`
  mutation ($input: SearchImeiDataInput!) {
    searchDeviceImeiData(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        createdBy
        imeiData {
          imei
          labelName
          _id
          boxSet
          journey {
            _id
            totalDuration
            totalDistance
            endDate
            startDate
            createdBy
            journeyName
          }
        }
        deviceGroupName
        updateBy
      }
    }
  }
`;
