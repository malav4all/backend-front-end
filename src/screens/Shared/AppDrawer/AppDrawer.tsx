import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import history from "../../../utils/history";
import { isTruthy } from "../../../helpers/methods";
import { GenerateMenu } from "../../../utils/AuthorizationManager";
import {
  activeMenuBackgroundColor,
  disabledBackgroundColor,
  theme,
} from "../../../utils/styles";
import { CloseButton, CustomPaper } from "../../../global/components";
import { store } from "../../../utils/store";
import { logOutAction, selectName } from "../../../redux/authSlice";
import appDrawerStyles from "./AppDrawer.styles";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import LogoutIcon from "../../../assets/icons/Logout.png";
import ROUTEYE_LOGO from "../../../assets/images/ROUTEYE_LOGO.png";
import ROUTEYE_LOGO_MINI from "../../../assets/images/ROUTEYE_LOGO_MINI.png"
interface CustomProps {
  setMenuMobileVisible?: Function;
  isActive?: boolean;
}

const AppDrawer = (props: CustomProps) => {
  const classes = appDrawerStyles;
  const pathname = window.location.pathname;
  const [optionItems, setOptionItems] = useState<any[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectName);

  useEffect(() => {
    generateAppDrawer();
  }, []);

  useEffect(() => {
    setActiveIndexFromUrl();
  }, [optionItems, pathname]);

  const setActiveIndexFromUrl = () => {
    let activeIndexFromUrl = optionItems.findIndex(
      (item: any) => item.link === pathname || isSubMenuItemActive(item)
    );
    setActiveIndex(activeIndexFromUrl);
  };

  const generateAppDrawer = () => {
    setOptionItems(GenerateMenu());
  };

  const handleSubmenuToggle = (index: number, option: any) => {
    setActiveIndex(
      activeIndex === index && isTruthy(option.subMenu) ? -1 : index
    );
  };

  const handleRedirection = (option: any) => {
    if (isTruthy(option.subMenu)) {
      history.push(option.subMenu[0].link);
    } else {
      option.link && history.push(option.link);
    }
    props.setMenuMobileVisible?.(false);
  };

  const isActiveTab = (pathName: string) => {
    return (
      pathName?.toLocaleLowerCase() ===
      window.location.pathname.toLocaleLowerCase()
    );
  };

  const isSubMenuItemActive = (option: any) => {
    return option?.subMenu?.some((item: any) => item.link === pathname);
  };

  const listItemClickHandler = (option: any, index: number) => {
    handleSubmenuToggle(index, option);
    if (!isSubMenuItemActive(option)) {
      handleRedirection(option);
    }
  };

  const renderSubmenuItems = (subMenuOptions: any[], parentIndex: any) => {
    if (!subMenuOptions) return null;
    return (
      <Collapse in={parentIndex === activeIndex}>
        {subMenuOptions.map((data: any, index: number) => (
          <Box
            component={"div"}
            sx={[
              index + 1 === subMenuOptions.length && {
                borderRadius: "0 0 13px 13px",
              },
              isActiveTab(data.link)
                ? classes.selectedMenuOption
                : {
                    ...classes.menuOption,
                    backgroundColor: "#5F22E1",
                  },
            ]}
          >
            <ListItem
              id="app_drawer_sub_menu_link"
              sx={[
                isDrawerOpen
                  ? classes.menuItems
                  : classes.closedDrawerSubMenuItem,
              ]}
              onClick={() => {
                handleRedirection(data);
              }}
            >
              {isDrawerOpen ? (
                <ListItemText>
                  <Box sx={classes.listItemTextBox}>
                    <Typography
                      sx={{
                        ...classes.navBarLabel,
                        ...classes.listItemTextBox,
                        marginLeft: "35px",
                      }}
                    >
                      <Typography sx={classes.navBarLabel}>
                        {data.text}
                      </Typography>
                    </Typography>
                    <Typography>
                      {" "}
                      {isActiveTab(data.link) && (
                        <Box sx={classes.activeIcon}></Box>
                      )}
                    </Typography>
                  </Box>
                </ListItemText>
              ) : (
                <Tooltip title={data.text} placement="bottom" arrow>
                  <ListItemIcon>
                    {isActiveTab(data.link) ? data.activeIcon : data.icon}
                  </ListItemIcon>
                </Tooltip>
              )}
            </ListItem>
          </Box>
        ))}
      </Collapse>
    );
  };

  const getArrowIcon = (index: number) => {
    return activeIndex === index ? (
      <KeyboardArrowUpIcon />
    ) : (
      <KeyboardArrowDownIcon />
    );
  };

  const getMenuOptions = (option: any, index: number) => {
    return (
      <React.Fragment key={index}>
        <Box
          component={"div"}
          sx={[
            isTruthy(option.subMenu) && index === activeIndex
              ? { borderRadius: "13px 13px 0 0" }
              : { borderRadius: "13px" },
            index === activeIndex || isSubMenuItemActive(option)
              ? classes.selectedMenuOption
              : classes.menuOption,
          ]}
        >
          <ListItem
            sx={[
              isDrawerOpen
                ? classes.menuItems
                : classes.closedDrawerListItemStyles,
            ]}
            id="app_drawer_menu_link"
            onClick={() => {
              listItemClickHandler(option, index);
            }}
          >
            <Tooltip
              title={isDrawerOpen ? "" : option.text}
              placement="bottom"
              arrow
            >
              <Box sx={classes.listItemIconBox}>
                <ListItemIcon
                  sx={[
                    isDrawerOpen
                      ? classes.openDrawerListItemIcon
                      : classes.closedDrawerListItemIcon,
                  ]}
                >
                  {isActiveTab(option.link) || isSubMenuItemActive(option)
                    ? option.activeIcon
                    : option.icon}
                </ListItemIcon>
                {isTruthy(option.subMenu) && !isDrawerOpen && (
                  <Box sx={classes.closedDrawerListItemArrowIcon}>
                    {getArrowIcon(index)}
                  </Box>
                )}
              </Box>
            </Tooltip>
            {isDrawerOpen && (
              <ListItemText>
                <Box sx={classes.listItemTextBox}>
                  <Typography sx={classes.navBarLabel}>
                    <span>{option.text}</span>
                  </Typography>
                  {isTruthy(option.subMenu)
                    ? getArrowIcon(index)
                    : isActiveTab(option.link) && (
                        <Box sx={classes.activeIcon}></Box>
                      )}
                </Box>
              </ListItemText>
            )}
          </ListItem>
        </Box>
        {option.subMenu && renderSubmenuItems(option.subMenu, index)}
      </React.Fragment>
    );
  };

  const getNewMenuOptions = () => {
    return (
      <List dense>
        {optionItems.map((option, index) => {
          return <>{getMenuOptions(option, index)}</>;
        })}
      </List>
    );
  };

  const getAppLogo = () => {
    return (
      <Box sx={classes.logoBox}>
        {!isDrawerOpen && isDesktop ? (
          <img src={ROUTEYE_LOGO_MINI} height="13px" />
        ) : (
          <img src={ROUTEYE_LOGO} height="27px" />
        )}
      </Box>
    );
  };

  const getCloseButton = () => {
    return (
      <CloseButton
        onClick={() => {
          props.setMenuMobileVisible?.(false);
        }}
      />
    );
  };

  const handleLogout = () => {
    history.push("/");
    store.dispatch(logOutAction());
    localStorage.clear();
  };

  const getLogoutButton = () => {
    return (
      <Box sx={isDrawerOpen ? classes.logOutWrapper : classes.logOutWrapper1}>
        <Box
          sx={classes.logOutLeft}
          onClick={() => {
            props.setMenuMobileVisible?.(false);
          }}
          component={"div"}
          id="app_drawer_logout_button"
        >
          <Box
            sx={isDrawerOpen ? classes.squareBox : classes.squareBox1}
            component={"div"}
          >
            <Typography sx={classes.avatarStyle}>
              {userName.charAt(0)}
            </Typography>
          </Box>

          {isDrawerOpen && (
            <Typography sx={classes.avatarFirstName}>{userName}</Typography>
          )}
        </Box>

        <Tooltip
          title={
            <CustomPaper
              className={{ backgroundColor: disabledBackgroundColor }}
            >
              <Typography sx={classes.logoutTooltipText}>{"Logout"}</Typography>
            </CustomPaper>
          }
          placement="top"
          arrow
          componentsProps={{
            tooltip: {
              sx: {
                background: "none",
              },
            },
          }}
        >
          <Box ml={1} onClick={handleLogout} sx={{ color: "white" }}>
            <RiLogoutCircleRLine size={25} />
          </Box>
        </Tooltip>
      </Box>
    );
  };

  const getAppDrawer = () => {
    return (
      <>
        <Box
          sx={[
            isDrawerOpen ? classes.drawerHide : classes.drawer,
            classes.drawerContainerBox,
          ]}
        >
          <Box sx={classes.drawerWidth}>
            <Box>
              {!isDesktop && getCloseButton()}
              {getAppLogo()}
              {isDesktop && (
                <Box
                  onClick={() => {
                    setIsDrawerOpen(!isDrawerOpen);
                  }}
                  sx={[
                    isDrawerOpen
                      ? classes.openDrawerIconBox
                      : classes.closedDrawerIconBox,
                    classes.drawerIconBox,
                  ]}
                >
                  {isDrawerOpen ? (
                    <ArrowBackIcon fontSize="small" />
                  ) : (
                    <ArrowForwardIcon fontSize="small" />
                  )}
                </Box>
              )}
            </Box>
            <Box sx={classes.menuOptionsHeight}>{getNewMenuOptions()}</Box>
            <Box>{getLogoutButton()}</Box>
          </Box>
        </Box>
      </>
    );
  };

  return getAppDrawer();
};

export default AppDrawer;
