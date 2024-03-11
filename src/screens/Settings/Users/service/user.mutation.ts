import { gql } from "@apollo/client";

export const FETCH_ACCOUNT = gql`
  mutation ($input: AccountModuleInput!) {
    fetchAccountModuleList(input: $input) {
      success
      message
      data {
        _id
        accountName
        industryType {
          _id
        }
      }
    }
  }
`;

export const FETCH_USER = gql`
  mutation ($input: UserInput!) {
    userListAll(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        firstName
        lastName
        userName
        email
        status
        mobileNumber
        createdBy
        accountId {
          _id
          accountName
          industryType {
            _id
            name
          }
        }
        roleId {
          _id
          name
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ($input: CreateUserInput!) {
    createUser(input: $input) {
      success
      message
    }
  }
`;

export const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      success
      message
    }
  }
`;

export const FETCH_ROLE = gql`
  mutation ($input: RoleInput!) {
    roleListAll(input: $input) {
      success
      message
      data {
        _id
        name
        industryType {
          name
        }
      }
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;

export const SEARCH_USER = gql`
  mutation ($input: SearchUsersInput!) {
    searchUsers(input: $input) {
      paginatorInfo {
        count
      }
      success
      message
      data {
        _id
        firstName
        lastName
        userName
        email
        status
        mobileNumber
        createdBy
        accountId {
          _id
          accountName
          industryType {
            _id
            name
          }
        }
        roleId {
          _id
          name
        }
      }
    }
  }
`;