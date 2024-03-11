import strings from "../global/constants/StringConstants";
import { store } from "./store";
import {
  getGroupIcon,
  getHistoryIcon,
  getHomeIcon,
  getIntegrationIcon,
  getSettingsIcon,
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
      icon: getIntegrationIcon("#666"),
      activeIcon: getIntegrationIcon(pinkDarkColor),
      text: "LoginActivity",
      link: `${"/loginActivity"}`,
      pageName: strings.LOGINACTIVITY,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },

    {
      icon: getHistoryIcon("#666"),
      activeIcon: getHistoryIcon(pinkDarkColor),
      text: "Device History",
      link: `${"/device-history"}`,
      pageName: strings.DEVICEHISTORY,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },

    {
      icon: getGroupIcon("#666"),
      activeIcon: getGroupIcon(pinkDarkColor),
      text: "Device Onboarding",
      link: `${"/device-onboarding"}`,
      pageName: strings.DEVICEONBOARDING,
      visibleInSidebar: true,
      accessWithoutAnyResource: true,
      accessToResource: [],
      subMenu: [],
    },
  ] as any;

const checkAccessToResource = (accessToResource: any) => {
  const resources = store.getState().auth.resources;
  console.log("Resources : ", resources);
  const hasAccess = accessToResource?.some(
    (accessToResource: AccessToResource) => {
      if (!resources.hasOwnProperty(accessToResource.resource)) {
        return false;
      }

      const permissions = resources[accessToResource.resource];
      const hasAllPermissions = accessToResource.permissions?.every(
        (indPermission: string) => permissions.includes(indPermission)
      );

      if (accessToResource.allPermissionRequired && hasAllPermissions) {
        return true;
      }

      return accessToResource.permissions?.some((indPermission: string) =>
        permissions.includes(indPermission)
      );
    }
  );
  return hasAccess;
};

export const GenerateMenu = (mainMenus: ListOfMenusType[] = ListOfMenus()) => {
  const generatedMenu: ListOfMenusType[] = [];

  mainMenus.forEach((menu: ListOfMenusType) => {
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
      if (isTruthy(subMenuItem)) {
        hasAccessToSubMenu = checkAccessToResource(
          subMenuItem!.accessToResource
        );
      }
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

  return isAdmin() || checkAccessToResource(accessToResource);
};

export const hasAccessTo = (resourceName: string, permission: string) => {
  console.log(resourceName, permission);
  if (isAdmin()) {
    console.log("If Condition");
    return true;
  }

  const resources = store.getState().auth.resources;

  return (
    resources.hasOwnProperty(resourceName) &&
    resources[resourceName].includes(permission)
  );
};

export const isAdmin = () => {
  const roleId = store.getState().auth.roleId;

  return roleId === "Master Admin";
};
