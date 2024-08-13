import {
  alertConfigIcon,
  assetSvg,
  deviceGroupIcon,
  geoZoneSvg,
  getDashboardIcon,
  getSettingsIcon,
  getTripIcon,
  routesIcon,
  liveSvg,
  reportIcon,
  reportSvg,
  trackPlaySvg,
  getFromBuilderIcon,
  getInventoryIcon,
} from "./SidebarSvgConstant";
import { store } from "./store";

export interface ListOfMenusType {
  icon?: string;
  activeIcon?: string;
  text?: string;
  key?: string;
  link?: string;
  pageName: string;
  subMenu?: ListOfMenusType[];
  visibleInSidebar?: boolean;
  accessWithoutAnyResource?: boolean;
  accessToResource: AccessToResource[];
}
const iconMap: any = {
  routesIcon: (color: any) => routesIcon(color),
  geoZoneSvg: (color: any) => geoZoneSvg(color),
  assetSvg: (color: any) => assetSvg(color),
  deviceGroupIcon: (color: any) => deviceGroupIcon(color),
  getDashboardIcon: (color: any) => getDashboardIcon(color),
  getSettingsIcon: (color: any) => getSettingsIcon(color),
  getTripIcon: (color: any) => getTripIcon(color),
  alertConfigIcon: (color: any) => alertConfigIcon(color),
  reportIcon: (color: any) => reportIcon(color),
  getFromBuilderIcon: (color: any) => getFromBuilderIcon(color),
  getInventoryIcon: (color: any) => getInventoryIcon(color),
};

export const getIconComponent = (iconKey: any, color: any): any => {
  const iconFunc: any = iconMap[iconKey];
  return iconFunc ? iconFunc(color) : null;
};
export type AccessToResource = {
  resource: string;
  permissions: string[];
  allPermissionRequired: boolean;
};

export const GenerateMenu = (mainMenus: ListOfMenusType[]) => {
  const generatedMenu: ListOfMenusType[] = [];

  mainMenus?.forEach((menu: ListOfMenusType) => {
    if (menu?.visibleInSidebar) {
      generatedMenu?.push(menu);
    }
  });

  return generatedMenu;
};

export const hasAccessTo = (resourceName: string, permission: string) => {
  if (isAdmin()) {
    return true;
  }

  const resources: any = store.getState().auth.resources;

  const resource: any = resources?.find(
    (res: any) => res.name === resourceName
  );

  if (!resource) {
    return false;
  }

  const normalizedPermission = permission.toLowerCase();
  const normalizedPermissions = resource.permissions.map((perm: string) =>
    perm.toLowerCase()
  );

  const hasAccess = normalizedPermissions.includes(normalizedPermission);

  return hasAccess;
};

export const doesUserHasAccessTo = (
  componentName: string,
  sidebar: ListOfMenusType[]
) => {
  const findMenuItem = (menuList = sidebar) => {
    return menuList?.find(
      (item: ListOfMenusType) => item?.pageName === componentName
    );
  };

  const checkAccessToSubMenu = () => {
    let subMenuItem: ListOfMenusType | undefined = undefined;
    let hasAccessToSubMenu: boolean = false;
    for (const menuItem of sidebar) {
      subMenuItem = findMenuItem(menuItem?.subMenu);
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

  return roleId === "Master Admin" || "Admin" || "Super Admin";
};
