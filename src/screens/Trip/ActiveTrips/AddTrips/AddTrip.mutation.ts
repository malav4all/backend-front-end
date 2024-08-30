import { gql } from "@apollo/client";
export const GET_ALL_DEVICE = gql`
  mutation ($input: DeviceOnboardingFetchInput!) {
    fetchDeviceOnboardingListWithLocation(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        createdBy
        businessModel
        deviceOnboardingIMEINumber
        deviceOnboardingSimNo
        accountId
        location
      }
    }
  }
`;

export const FETCH_GEOZONE = gql`
  mutation ($input: GeozoneInput!) {
    listGeozone(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        name
        description
        locationId
        locationType
        mobileNumber
        finalAddress
        address {
          country
          state
          city
          area
          district
          zipCode
        }
        geoCodeData {
          type
          geometry {
            type
            coordinates
            radius
          }
        }
      }
    }
  }
`;

export const FETCH_ENTITY = gql`
  mutation ($input: EntitesTypeInput!) {
    fetchEntityByTripTypeAndType(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        createdBy
        aadharCardNo
        gstIn
        contactPhone
        contactEmail
        contactName
        pinCode
        district
        area
        state
        city
        address
        type
        name
        tripTypeList
        accountId
      }
    }
  }
`;
export const CREATE_TRIP = gql`
  mutation ($input: CreateTripInput!) {
    createTrip(input: $input) {
      success
      message
    }
  }
`;

export const CHECK_BATTERY = gql`
  mutation ($input: BatteryCheckInput!) {
    checkBattery(input: $input) {
      success
      message
    }
  }
`;

export const UPLOAD_FILE = gql`
  mutation ($input: FileUploadInput!) {
    fileUpload(input: $input) {
      fileName
      message
    }
  }
`;
