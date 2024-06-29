import { gql } from "@apollo/client";

export const FETCH_INDUSTRY_TYPE = gql`
  mutation ($input: IndustryInput!) {
    industryListAll(input: $input) {
      data {
        _id
        name
        code
      }
    }
  }
`;

export const FETCH_INDUSTRY_TYPE_WITH_CODE = gql`
  mutation ($input: fetchIndustryNameCodeInput!) {
    fetchIndustryName(input: $input) {
      data {
        code
      }
    }
  }
`;

export const ADD_ROLE = gql`
  mutation ($input: CreateRoleInput!) {
    createRole(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ROLE = gql`
  mutation ($input: RoleInput!) {
    roleListAll(input: $input) {
      paginatorInfo {
        count
      }
      data {
        _id
        name
        industryType {
          _id
          name
        }
        description
        resources {
          name
          permissions
        }
      }
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation ($input: UpdateRoleInput!) {
    updateRoleData(input: $input) {
      success
      message
    }
  }
`;

export const SEARCH_ROLE = gql`
  mutation ($input: SearchRolesInput!) {
    searchRoles(input: $input) {
      success
      message
      paginatorInfo {
        count
      }
      data {
        _id
        name
        industryType {
          name
        }
        description
        resources {
          name
          permissions
        }
      }
    }
  }
`;

export const CHECK_EXITS_ROLE = gql`
  mutation ($input: checkRoleInput!) {
    checkExistsRole(input: $input) {
      success
      message
    }
  }
`;
