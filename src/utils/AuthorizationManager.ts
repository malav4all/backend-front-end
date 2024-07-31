/* eslint-disable */
import strings from "../global/constants/StringConstants";
import { store } from "./store";
import {
  alertConfigIcon,
  deviceGroupIcon,
  geoZoneSvg,
  getHomeIcon,
  getSettingsIcon,
  getTripIcon,
  routesIcon,
  reportIcon,
} from "./SidebarSvgConstant";
import { pinkDarkColor } from "./styles";

export interface ListOfMenusType {
  icon?: string;
  activeIcon?: string;
  text?: string;
  key?: string;
  link?: string;
  pageName: string;
  subMenu?: [];
  visibleInSidebar?: boolean;
  accessWithoutAnyResource?: boolean;
  accessToResource: AccessToResource[];
}

export type AccessToResource = {
  resource: string;
  permissions: string[];
  allPermissionRequired: boolean;
};

const ListOfMenus = () =>
  [
    {
      icon: getHomeIcon("#dbdbdb"),
      activeIcon: getHomeIcon(pinkDarkColor),
      text: "Dashboard",
      link: "/dashboard",
      pageName: strings.DASHBOARD,
      visibleInSidebar: true,
      accessToResource: [],
      subMenu: [
        {
          icon: getHomeIcon("#dbdbdb"),
          activeIcon: getHomeIcon(pinkDarkColor),
          text: "Device Dashboard",
          link: "/dashboard",
          pageName: strings.DASHBOARD,
          visibleInSidebar: true,
          accessToResource: [],
          subMenu: [],
        },
        {
          icon: getHomeIcon("#dbdbdb"),
          activeIcon: getHomeIcon(pinkDarkColor),
          text: "Trip Dashboard",
          link: "/trip-dashboard",
          pageName: strings.TRIPDASHBOARD,
          visibleInSidebar: true,
          accessToResource: [],
          subMenu: [],
        },
      ],
    },
    {
      icon: geoZoneSvg("#dbdbdb"),
      activeIcon: geoZoneSvg(pinkDarkColor),
      text: "Location",
      link: "/location",
      pageName: strings.SETTINGS,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Geozones",
          link: "/location",
          pageName: strings.LOCATION,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Location Type",
          link: "/settings/LocationType",
          pageName: strings.INDUSTRY,
        },
      ],
    },
    // {
    //   icon: assetSvg("#dbdbdb"),
    //   activeIcon: assetSvg(pinkDarkColor),
    //   text: "Asset Assignment",
    //   link: `${"/asset-assignment"}`,
    //   pageName: strings.ASSET_ASSIGNMENT,
    //   visibleInSidebar: true,
    //   accessWithoutAnyResource: true,
    //   accessToResource: [],
    //   subMenu: [],
    // },
    {
      icon: deviceGroupIcon("#dbdbdb"),
      activeIcon: deviceGroupIcon(pinkDarkColor),
      text: "Device Group",
      link: `${"/device-group"}`,
      pageName: strings.DEVICE_GROUP,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },
    {
      icon: routesIcon("#dbdbdb"),
      activeIcon: routesIcon(pinkDarkColor),
      text: "Routes",
      link: `${""}`,
      pageName: strings.ROUTES,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Active Routes",
          link: `${"/routes"}`,
          pageName: strings.ACTIVE_ROUTES,
        },
        {
          text: "Archived Routes",
          link: `${"/archived-routes"}`,
          pageName: strings.ACTIVE_ROUTES,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Upcoming Routes",
          link: `${"/upcoming-routes"}`,
          pageName: strings.UPCOMING_ROUTES,
        },
      ],
    },
    {
      icon: reportIcon("#dbdbdb"),
      activeIcon: reportIcon(pinkDarkColor),
      text: "Reports",
      link: `${"/reports"}`,
      pageName: strings.LOCATION,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Distance Reports",
          link: `${"/distance-reports"}`,
          pageName: strings.LOCATION,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Alert Reports",
          link: `${"/alert-reports"}`,
          pageName: strings.LOCATION,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Routes Reports",
          link: `${"/routes-reports"}`,
          pageName: strings.LOCATION,
        },
      ],
    },
    {
      icon: getSettingsIcon("#dbdbdb"),
      activeIcon: getSettingsIcon(pinkDarkColor),
      text: "Settings",
      link: "/settings",
      pageName: strings.SETTINGS,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "User",
          link: "/settings/Users",
          pageName: strings.USERS,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Industry",
          link: "/settings/Industry",
          pageName: strings.INDUSTRY,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Module",
          link: "/settings/Module",
          pageName: strings.MODULE,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Account",
          link: "/settings/Account",
          pageName: strings.ACCOUNT,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "DataPush",
          link: "/settings/Datapush",
          pageName: strings.ACCOUNT,
        },
      ],
    },
    {
      icon: alertConfigIcon("#dbdbdb"),
      activeIcon: alertConfigIcon(pinkDarkColor),
      text: "Alerts",
      link: `${"/alert-config"}`,
      pageName: strings.ALERT_CONFIG,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },
    {
      icon: getTripIcon("#dbdbdb"),
      activeIcon: getTripIcon(pinkDarkColor),
      text: "Trips",
      link: `${"/trip"}`,
      pageName: strings.TRIP,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Active Trips",
          link: `${"/active-trips"}`,
          pageName: strings.ACTIVE_TRIPS,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Archived Trips",
          link: `${"/archived-trips"}`,
          pageName: strings.ARCHIVED_TRIPS,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "User Access",
          link: `${"/user-access"}`,
          pageName: strings.USER_ACCESS,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Entity",
          link: `${"/entity"}`,
          pageName: strings.ENTITY,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Entity Type",
          link: `${"/entity-type"}`,
          pageName: strings.ENTITY_TYPE,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Trip Type",
          link: `${"/trip-type"}`,
          pageName: strings.ENTITY_TYPE,
        },
      ],
    },
    {
      icon: getTripIcon("#dbdbdb"),
      activeIcon: getTripIcon(pinkDarkColor),
      text: "Inventory",
      link: `${"/inventory"}`,
      pageName: strings.TRIP,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Add Device",
          link: `${"/add-device"}`,
          pageName: strings.ADD_DEVICE,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Device Model",
          link: `${"/device-module"}`,
          pageName: strings.ACTIVE_TRIPS,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Device History",
          link: `${"/device-history"}`,
          pageName: strings.ARCHIVED_TRIPS,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Device Onboarding",
          link: `${"/device-onboarding"}`,
          pageName: strings.ARCHIVED_TRIPS,
        },
        {
          icon: geoZoneSvg("#dbdbdb"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Device Transfer",
          link: `${"/device-transfer"}`,
          pageName: strings.DEVICE_TRANSFER,
        },
      ],
    },
    {
      icon: alertConfigIcon("#dbdbdb"),
      activeIcon: alertConfigIcon(pinkDarkColor),
      text: "Form Builder",
      link: `${"/form-builder"}`,
      pageName: strings.FORM_BUILDER,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },
  ] as any;

// const ListOfMenus = () =>
//   [
//     {
//       icon: getHomeIcon("#dbdbdb"),
//       activeIcon: getHomeIcon(pinkDarkColor),
//       text: "Dashboard",
//       link: "/a",
//       pageName: strings.DASHBOARD,
//       visibleInSidebar: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: getHomeIcon("#dbdbdb"),
//           activeIcon: getHomeIcon(pinkDarkColor),
//           text: "Trip Dashboard",
//           link: "/b",
//           pageName: strings.TRIPDASHBOARD,
//           visibleInSidebar: true,
//           accessToResource: [],
//           subMenu: [],
//         },
//         {
//           icon: getHomeIcon("#dbdbdb"),
//           activeIcon: getHomeIcon(pinkDarkColor),
//           text: "Trip Dashboard",
//           link: "/c",
//           pageName: strings.DASHBOARD,
//           visibleInSidebar: true,
//           accessToResource: [],
//           subMenu: [],
//         },
//         {
//           icon: getHomeIcon("#dbdbdb"),
//           activeIcon: getHomeIcon(pinkDarkColor),
//           text: "Map View",
//           link: "/d",
//           pageName: strings.DASHBOARD,
//           visibleInSidebar: true,
//           accessToResource: [],
//           subMenu: [],
//         },
//       ],
//     },
//     {
//       icon: geoZoneSvg("#dbdbdb"),
//       activeIcon: geoZoneSvg(pinkDarkColor),
//       text: "Devices",
//       link: `${"/e"}`,
//       pageName: strings.LOCATION,
//       visibleInSidebar: true,
//       accessWithoutAnyResource: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Device Management",
//           link: `${"/f"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           text: "Device Group",
//           link: `${"/g"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Live Track",
//           link: `${"/h"}`,
//           pageName: strings.UPCOMING_ROUTES,
//         },
//       ],
//     },
//     {
//       icon: geoZoneSvg("#dbdbdb"),
//       activeIcon: geoZoneSvg(pinkDarkColor),
//       text: "Locations",
//       link: `${"/i"}`,
//       pageName: strings.LOCATION,
//       visibleInSidebar: true,
//       accessWithoutAnyResource: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "location Types",
//           link: `${"/j"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           text: "Locations",
//           link: `${"/k"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//       ],
//     },
//     {
//       icon: geoZoneSvg("#dbdbdb"),
//       activeIcon: geoZoneSvg(pinkDarkColor),
//       text: "Routes",
//       link: `${"/l"}`,
//       pageName: strings.LOCATION,
//       visibleInSidebar: true,
//       accessWithoutAnyResource: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Create Routes",
//           link: `${"/m"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           text: "View Routes",
//           link: `${"/n"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "List Routes",
//           link: `${"/o"}`,
//           pageName: strings.UPCOMING_ROUTES,
//         },
//       ],
//     },
//     {
//       icon: geoZoneSvg("#dbdbdb"),
//       activeIcon: geoZoneSvg(pinkDarkColor),
//       text: "Trips",
//       link: `${"/p"}`,
//       pageName: strings.LOCATION,
//       visibleInSidebar: true,
//       accessWithoutAnyResource: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Entity",
//           link: `${"/q"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           text: "Enitity Types",
//           link: `${"/r"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Trip Types",
//           link: `${"/s"}`,
//           pageName: strings.UPCOMING_ROUTES,
//         },
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Trips",
//           link: `${"/t"}`,
//           pageName: strings.UPCOMING_ROUTES,
//         },
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Trip Form Builder",
//           link: `${"/u"}`,
//           pageName: strings.UPCOMING_ROUTES,
//         },
//       ],
//     },
//     {
//       icon: geoZoneSvg("#dbdbdb"),
//       activeIcon: geoZoneSvg(pinkDarkColor),
//       text: "Reports",
//       link: `${"/v"}`,
//       pageName: strings.LOCATION,
//       visibleInSidebar: true,
//       accessWithoutAnyResource: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Distance Report",
//           link: `${"/w"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           text: "Alert Report",
//           link: `${"/x"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Trip Report",
//           link: `${"/y"}`,
//           pageName: strings.UPCOMING_ROUTES,
//         },
//       ],
//     },
//     {
//       icon: geoZoneSvg("#dbdbdb"),
//       activeIcon: geoZoneSvg(pinkDarkColor),
//       text: "Alerts",
//       link: `${"/z"}`,
//       pageName: strings.LOCATION,
//       visibleInSidebar: true,
//       accessWithoutAnyResource: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Configuration",
//           link: `${"/aa"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           text: "Alert list",
//           link: `${"/ab"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//       ],
//     },
//     {
//       icon: routesIcon("#dbdbdb"),
//       activeIcon: routesIcon(pinkDarkColor),
//       text: "Setting",
//       link: `${"/ac"}`,
//       pageName: strings.ROUTES,
//       visibleInSidebar: true,
//       accessWithoutAnyResource: true,
//       accessToResource: [],
//       subMenu: [
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "User Management",
//           link: `${"/ad"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           text: "Account Management",
//           link: `${"/ae"}`,
//           pageName: strings.ACTIVE_ROUTES,
//         },
//         {
//           icon: geoZoneSvg("#dbdbdb"),
//           activeIcon: geoZoneSvg(pinkDarkColor),
//           text: "Personalization",
//           link: `${"/af"}`,
//           pageName: strings.UPCOMING_ROUTES,
//         },
//       ],
//     },
//   ] as any;

export const GenerateMenu = (mainMenus: ListOfMenusType[] = ListOfMenus()) => {
  const generatedMenu: ListOfMenusType[] = [];

  mainMenus?.forEach((menu: ListOfMenusType) => {
    if (menu.visibleInSidebar) {
      generatedMenu.push(menu);
    }
  });

  return generatedMenu;
};

export const hasAccessTo = (resourceName: string, permission: string) => {
  if (isAdmin()) {
    return true;
  }

  const resources = store.getState().auth.resources;

  return (
    resources.hasOwnProperty(resourceName) &&
    resources[resourceName].includes(permission)
  );
};

export const doesUserHasAccessTo = (componentName: string) => {
  const mainMenu: ListOfMenusType[] = ListOfMenus();

  const findMenuItem = (menuList = ListOfMenus()) => {
    return menuList.find(
      (item: ListOfMenusType) => item.pageName === componentName
    );
  };

  const checkAccessToSubMenu = () => {
    let subMenuItem: ListOfMenusType | undefined = undefined;
    let hasAccessToSubMenu: boolean = false;
    for (const menuItem of mainMenu) {
      subMenuItem = findMenuItem(menuItem.subMenu);
    }
    return hasAccessToSubMenu;
  };

  const doesComponentExist = findMenuItem();

  if (!doesComponentExist) {
    return isAdmin() || checkAccessToSubMenu();
  }
  if (doesComponentExist.accessWithoutAnyResource) {
    return true;
  }

  const accessToResource = doesComponentExist.accessToResource;

  return isAdmin();
};

export const isAdmin = () => {
  const roleId = store.getState().auth.role;

  return roleId === "Master Admin" || "Admin";
};
