/* eslint-disable */
import strings from "../global/constants/StringConstants";
import { store } from "./store";
import {
  geoZoneSvg,
  getHomeIcon,
  getSettingsIcon,
  journeyIcon,
  liveSvg,
  reportSvg,
  trackPlaySvg,
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
      icon: getHomeIcon("#666"),
      activeIcon: getHomeIcon(pinkDarkColor),
      text: "Dashboard",
      link: "/dashboard",
      pageName: strings.DASHBOARD,
      visibleInSidebar: true,
      accessToResource: [],
      subMenu: [
        {
          icon: getHomeIcon("#666"),
          activeIcon: getHomeIcon(pinkDarkColor),
          text: "Live Monitoring",
          link: "/dashboard",
          pageName: strings.DASHBOARD,
          visibleInSidebar: true,
          accessToResource: [],
          subMenu: [],
        },
        {
          icon: getHomeIcon("#666"),
          activeIcon: getHomeIcon(pinkDarkColor),
          text: "All Devices",
          link: "/device-dashboard",
          pageName: strings.DEVICEDASHBOARD,
          visibleInSidebar: true,
          accessToResource: [],
          subMenu: [],
        },
      ],
    },
    {
      icon: geoZoneSvg("#666"),
      activeIcon: geoZoneSvg(pinkDarkColor),
      text: "Location",
      link: `${"/location"}`,
      pageName: strings.LOCATION,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },
    {
      icon: journeyIcon("#666"),
      activeIcon: journeyIcon(pinkDarkColor),
      text: "Journey",
      link: `${""}`,
      pageName: strings.JOURNEY,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#666"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Active",
          link: `${"/journey"}`,
          pageName: strings.ACTIVE_JOURNEY,
        },
        {
          text: "Archived",
          link: `${"/archived-journey"}`,
          pageName: strings.ACTIVE_JOURNEY,
        },
        {
          icon: geoZoneSvg("#666"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Upcoming Journey",
          link: `${"/upcoming-journey"}`,
          pageName: strings.UPCOMING_JOURNEY,
        },
      ],
    },
    {
      icon: geoZoneSvg("#666"),
      activeIcon: geoZoneSvg(pinkDarkColor),
      text: "Reports",
      link: `${"/reports"}`,
      pageName: strings.LOCATION,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [
        {
          icon: geoZoneSvg("#666"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Distance Report",
          link: `${"/distance-reports"}`,
          pageName: strings.LOCATION,
        },
        {
          icon: geoZoneSvg("#666"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Alert Report",
          link: `${"/alert-reports"}`,
          pageName: strings.LOCATION,
        },
        {
          icon: geoZoneSvg("#666"),
          activeIcon: geoZoneSvg(pinkDarkColor),
          text: "Journey Reports",
          link: `${"/journey-reports"}`,
          pageName: strings.LOCATION,
        },
      ],
    },
    {
      icon: getSettingsIcon("#666"),
      activeIcon: getSettingsIcon(pinkDarkColor),
      text: "Settings",
      link: `${"/settings"}`,
      pageName: strings.SETTINGS,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },
  ] as any;

export const GenerateMenu = (mainMenus: ListOfMenusType[] = ListOfMenus()) => {
  const generatedMenu: ListOfMenusType[] = [];

  mainMenus?.forEach((menu: ListOfMenusType) => {
    if (menu.visibleInSidebar) {
      generatedMenu.push(menu);
    }
  });

  return generatedMenu;
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

  return roleId === "Admin";
};
