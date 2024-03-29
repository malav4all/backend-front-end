/* eslint-disable */
import strings from "../global/constants/StringConstants";
import { store } from "./store";
import {
  geoZoneSvg,
  getGroupIcon,
  getHistoryIcon,
  getHomeIcon,
  getIntegrationIcon,
  getSettingsIcon,
  journeyIcon,
} from "./SidebarSvgConstant";
import { pinkDarkColor } from "./styles";
import { isTruthy } from "../helpers/methods";

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
      text: "Home",
      link: "/dashboard",
      pageName: strings.DASHBOARD,
      visibleInSidebar: true,
      accessToResource: [],
      subMenu: [],
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
    {
      icon: journeyIcon("#666"),
      activeIcon: journeyIcon(pinkDarkColor),
      text: "Journey",
      link: `${"/journey"}`,
      pageName: strings.JOURNEY,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
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
