import { hasAccessTo } from "./../../utils/AuthorizationManager";
/* eslint-disable no-sparse-arrays */
import strings from "../../global/constants/StringConstants";
export const tabConfig = () => [
  {
    label: strings.USERS,
    count: 0,
  },
  {
    label: strings.INDUSTRY,
    count: 0,
  },
  {
    label: strings.MODULE,
    count: 0,
  },
  ...(hasAccessTo("RoleMangement", "fetch")
    ? [
        {
          label: strings.roleManagement,
          count: 0,
        },
      ]
    : []),

  {
    label: strings.ACCOUNT,
    count: 0,
  },
  {
    label: strings.DEVICEMODULE,
    count: 0,
  },
];

export const latestTabConfig: any = {
  "Super Admin": [
    {
      label: strings.USERS,
      count: 0,
    },

    {
      label: strings.ACCOUNT,
      count: 0,
    },
  ],
  "Master Admin": [
    {
      label: strings.USERS,
      count: 0,
    },
    {
      label: strings.INDUSTRY,
      count: 0,
    },
    {
      label: strings.MODULE,
      count: 0,
    },
    {
      label: strings.roleManagement,
      count: 0,
    },
    {
      label: strings.ACCOUNT,
      count: 0,
    },
    {
      label: strings.DEVICEMODULE,
      count: 0,
    },
  ],
  User: [
    {
      label: strings.USERS,
      count: 0,
    },
  ],
};

export const getTabLabelFromUrl = (tabUrl: any) => {
  switch (tabUrl) {
    // case "profile":
    //   return strings.profile;
    case "billing-usage":
      return strings.billingUsage;
    case "role-management":
      return strings.roleManagement;
    case "user":
      return strings.USERS;
    default:
      return "";
  }
};

export const getUrlFromTabLabel = (tabLabel: any) => {
  switch (tabLabel) {
    case strings.profile:
      return "profile";
    case strings.billingUsage:
      return "billing-usage";
    case strings.roleManagement:
      return "role-management";
    case strings.USERS:
      return "user";
    default:
      return "";
  }
};
