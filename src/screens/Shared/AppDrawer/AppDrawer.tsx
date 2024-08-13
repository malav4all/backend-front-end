import React, { useEffect, useRef, useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  useMediaQuery,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { Box } from "@mui/system";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { styled } from "@mui/material/styles";
import history from "../../../utils/history";
import { isTruthy } from "../../../helpers/methods";
import {
  GenerateMenu,
  ListOfMenusType,
  getIconComponent,
} from "../../../utils/AuthorizationManager";
import { IoIosLogOut } from "react-icons/io";
import {
  disabledBackgroundColor,
  pinkDarkColor,
  theme,
} from "../../../utils/styles";
import { CloseButton, CustomPaper } from "../../../global/components";
import { store } from "../../../utils/store";
import {
  logOutAction,
  selectName,
  selectSidebar,
} from "../../../redux/authSlice";
import appDrawerStyles from "./AppDrawer.styles";
import { useAppDispatch, useAppSelector } from "../../../utils/hooks";
import ROUTEYE_LOGO from "../../../assets/images/ROUTEYE_LOGO.png";
import ROUTEYE_LOGO_MINI from "../../../assets/images/ROUTEYE_LOGO_MINI.png";
import { useThemeContext } from "../../../redux/ThemeContext";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

interface CustomProps {
  setMenuMobileVisible?: Function;
  isActive?: boolean;
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

const AppDrawer = (props: CustomProps) => {
  const classes = appDrawerStyles;
  const pathname = window.location.pathname;
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const dispatch = useAppDispatch();
  const userName = useAppSelector(selectName);
  const { toggleTheme, darkMode } = useThemeContext();
  const sidebar = useAppSelector(selectSidebar);
  const submenuRefs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    setActiveIndexFromUrl();
  }, [sidebar, pathname]);

  const handleMouseEnter = (index: any) => {
    setIsHovered(index);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const setActiveIndexFromUrl = () => {
    let activeIndexFromUrl = sidebar?.findIndex(
      (item: any) => item?.link === pathname || isSubMenuItemActive(item)
    );
    setActiveIndex(activeIndexFromUrl);
  };

  const handleSubmenuToggle = (index: number, option: any) => {
    if (!isDrawerOpen) {
      return;
    }
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
    setIsDrawerOpen(true);
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
            key={index}
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
              classes.submenuItems, // Apply submenu item styles
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
                  <Box
                    sx={{
                      ...classes.listItemTextBox,
                      color: "#fffff0",
                    }}
                  >
                    <Typography
                      sx={{
                        ...classes.navBarLabel,
                        ...classes.listItemTextBox,
                        marginLeft: "2rem", // Add indentation to submenu items
                        fontSize: "0.875rem", // Reduced font size for submenu items
                      }}
                    >
                      <span>{data.text}</span>
                      {isActiveTab(data.link) && (
                        <span style={classes.activeDot}></span>
                      )}
                    </Typography>
                  </Box>
                </ListItemText>
              ) : (
                <Tooltip title={data.text} placement="right" arrow>
                  <ListItemIcon>
                    {isActiveTab(data?.link)
                      ? getIconComponent(data?.activeIcon, pinkDarkColor)
                      : getIconComponent(data?.icon, "#dbdbdb")}
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
    if (!isDrawerOpen) return null;
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
              ? { borderRadius: "8px 8px 0 0" }
              : { borderRadius: "8px" },
            index === activeIndex || isSubMenuItemActive(option)
              ? classes.selectedMenuOption
              : classes.menuOption,
          ]}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          position="relative"
          ref={(el: HTMLDivElement | null) => (submenuRefs.current[index] = el)}
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
              placement="right"
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
                  {isActiveTab(option?.link) || isSubMenuItemActive(option)
                    ? getIconComponent(option?.activeIcon, pinkDarkColor)
                    : getIconComponent(option?.icon, "#dbdbdb")}
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
                <Box
                  sx={{
                    ...classes.listItemTextBox,
                    color: "#fffff0",
                  }}
                >
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
        {sidebar?.map((option: any, index: any) => {
          return <>{getMenuOptions(option, index)}</>;
        })}
      </List>
    );
  };

  const getAppLogo = () => {
    return (
      <Box
        sx={classes.logoBox}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {!isDrawerOpen && isDesktop ? (
          <Box
            sx={{
              marginBottom: "2rem",
            }}
          ></Box>
        ) : (
          <Box
            component="img"
            src={ROUTEYE_LOGO}
            sx={{
              width: "10rem",
              marginTop: "1px",
              marginLeft: "-5px",
            }}
          ></Box>
        )}
      </Box>
    );
  };

  const getCloseButton = () => {
    return (
      <CloseButton
        onClick={() => {
          props?.setMenuMobileVisible?.(false);
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
            {/* <Typography sx={classes.avatarStyle}>
              {userName.charAt(0)}
            </Typography> */}
          </Box>

          {isDrawerOpen && (
            <Typography sx={classes.avatarFirstName}>{userName}</Typography>
          )}
        </Box>

        {isDrawerOpen && (
          <Tooltip
            title={
              <CustomPaper
                className={{ backgroundColor: disabledBackgroundColor }}
              >
                <Typography sx={classes.logoutTooltipText}>
                  {"Logout"}
                </Typography>
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
            <Box ml={1} onClick={handleLogout} sx={{ color: "#fffff0" }}>
              <IoIosLogOut size={27} />
            </Box>
          </Tooltip>
        )}
      </Box>
    );
  };

  const darkModeSection = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexWrap: "no-wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        p={2}
        borderRadius="10px"
      >
        {isDrawerOpen ? (
          <Box
            sx={{
              display: "flex",
              flexWrap: "no-wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            p={2}
          >
            <Box sx={{ color: "#fffff0" }}>Mode:</Box>
            <FormControlLabel
              sx={{
                margin: "-0.5rem",
              }}
              control={
                <MaterialUISwitch
                  checked={darkMode}
                  onChange={toggleTheme}
                  name="darkMode"
                  color="default"
                />
              }
              label=""
            />
          </Box>
        ) : (
          ""
        )}
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
            { zIndex: 13000 },
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
                    <MdOutlineKeyboardDoubleArrowLeft fontSize="22px" />
                  ) : (
                    <MdOutlineKeyboardDoubleArrowRight fontSize="30px" />
                  )}
                </Box>
              )}
            </Box>
            <Box sx={classes.menuOptionsHeight}>{getNewMenuOptions()}</Box>
            {/* <Box>{darkModeSection()}</Box>
            <Box>{getLogoutButton()}</Box> */}
          </Box>
        </Box>
      </>
    );
  };

  return getAppDrawer();
};

export default AppDrawer;
