import { Padding } from "@mui/icons-material";
import {
  boldFont,
  ultraBlackFont,
  drawerWidth,
  getRelativeFontSize,
  mediumFont,
  regularFont,
  theme,
  textLightColor,
  purplePrimaryColor,
  pinkDarkColor,
  activeMenuBackgroundColor,
  pureWhiteColor,
  lightFont,
  blackFont,
} from "../../../utils/styles";

const appDrawerStyles = {
  drawer: {
    display: "flex",
    gap: "1rem",
    height: "100vh",
    width: 80,
    backgroundColor: "#060B25",
    boxShadow: "0px 4px 40px 0px #0000000D",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    padding: 0,
    margin: 0,
    zIndex: 0,
  },
  drawerContainerBox: {
    position: "relative",
    transition: "width 0.2s ease-in-out",
  },
  drawerIconBox: {
    background: "#5F22E1",
    padding: "0.5rem",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "absolute",
    top: "26px",
  },
  openDrawerIconBox: {
    borderRadius: "100px",
    right: -26,
    boxShadow: "-7px 1px 14px 0 rgba(0, 0, 0, 0.08)",
  },
  closedDrawerIconBox: { borderRadius: "100px ", right: -26 },
  drawerHide: {
    display: "flex",
    height: "100vh",
    width: drawerWidth,
    backgroundColor: "#060B25",
    boxShadow: "0px 0px 100px rgba(0, 0, 0, 0.1)",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
    padding: 0,
    margin: 0,
    zIndex: 110,
  },
  drawerWidth: {
    width: drawerWidth,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
    height: "100vh",
    overflowY: "hidden",
    overflowX: "hidden",

    [theme.breakpoints.down("xl")]: {
      width: drawerWidth,
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  navLink: {
    textDecoration: "none",
  },
  menuItems: {
    margin: "4px",
  },
  closedDrawerListItemStyles: {
    // paddingLeft: "5px",
    margin: "8px auto",
  },
  openDrawerListItemIcon: {
    minWidth: "35px",
  },
  closedDrawerListItemArrowIcon: { maxHeight: "20px" },
  closedDrawerListItemIcon: {
    minWidth: "22px",
  },
  subMenuItems: {
    borderLeft: "4px solid",
  },
  closedDrawerSubMenuItem: { paddingLeft: "5px", margin: "4px 0" },
  menuOptionsHeight: {
    height: "75vh",
    overflowY: "hidden",
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      height: "50vh",
    },
    "&::-webkit-scrollbar": {
      width: "20px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      border: "3px solid #ffffff",
    },
  },
  menuOptionListItem: {
    ...mediumFont,
    cursor: "pointer",
    borderLeft: "4px solid transparent",
  },
  selectedMenuOptionListItem: {
    color: purplePrimaryColor,
    display: "flex",
    borderLeft: "4px solid",
    height: "30px",
    fontWeigh: "400"
  },
  menuOption: {
    display: "flex",
    textDecoration: "none",
    ...ultraBlackFont,

    color: "#dbdbdb",
    flexDirection: "column",
    cursor: "pointer",
    margin: "0 10px",
  },
  selectedMenuOption: {
    display: "flex",
    ...ultraBlackFont,
    fontWeight: "900",
    textDecoration: "none",
    color: "white",
    backgroundColor: "#5F22E1",
    flexDirection: "column",
    cursor: "pointer",
    margin: "0 10px",
  },
  selectedSubMenuOption: {
    display: "flex",
    ...lightFont,
    textDecoration: "none",
    color: purplePrimaryColor,
    flexDirection: "column",
    marginBottom: "15px",
  },
  navBarLabel: {
    ...lightFont,
  },
  listItemIconBox: {
    display: "flex",
    alignItems: "center",
    justifyItem: "center"
  },
  listItemTextBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logoBox: {
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "27px",
  },
  workText: {
    ...boldFont,
    display: "flex",
    fontSize: getRelativeFontSize(21),
    [theme.breakpoints.down("xl")]: {
      fontSize: getRelativeFontSize(17),
    },
  },
  sageText: {
    ...boldFont,
    color: "#828282",
    fontSize: getRelativeFontSize(21),
    [theme.breakpoints.down("xl")]: {
      fontSize: getRelativeFontSize(17),
    },
  },
  supportTicketBox: {
    borderRadius: "15px",
    mx: 5,
    mt: 1,
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xl")]: {},
    marginBottom: "10%",
  },
  btnBox: {
    ...ultraBlackFont,
    textTransform: "none",
  },
  imgBox: {
    background: "#22BAB6",
    width: "32px",
    height: "32px",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  activeIcon: {
    backgroundColor: "#060b25",
    height: "8px",
    width: "8px",
    borderRadius: "50%",
  },
  getCampaignWrapper: {
    height: "25vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: "16px",
    "& img": {
      width: "125px",
      height: "auto",
    },
  },
  getCampaignIcon: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  getCampaignImg: {
    width: "137px",
    height: "auto",
  },
  getCampaignPara: {
    fontSize: "14px",
    lineHeight: "20px",
    textAlign: "center",
    color: "#ffffff",
    ...ultraBlackFont,
    margin: "10px 0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logOutWrapper: {
    height: "10vh",
    display: "flex",
    padding: "0 16px",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "15px",
    [theme.breakpoints.down("xl")]: {},
  },
  logOutWrapper1: {
    height: "6vh",
    display: "flex",
    padding: "16px",
    flexWrap: "no-wrap",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#060B25",
    borderRadius: "15px",
    [theme.breakpoints.down("xl")]: {},
  },
  logOutLeft: {
    display: "flex",
    alignItems: "center",
  },
  logoutTooltipText: {
    padding: "10px",
    color: "white",
    fontSize: "14px",
    ...regularFont,
  },
  logoutImageStyle: { width: "25px", height: "auto", cursor: "pointer" },
  squareBox: {
    width: "25px",
    height: "25px",
    borderRadius: "100%",
    background: "#5F22E1",
    color: "white",
    padding: "0.3rem",
    display: "flex",
    fontSize: "0.8rem",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px 5px 0px 0px",
  },
  squareBox1: {
    width: "30px",
    height: "30px",
    borderRadius: "100px",
    background: "#5F22E1",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    color: "white"
  },
  avatarStyle: {
    ...boldFont,
    fontSize: getRelativeFontSize(8),
  },
  avatarFirstName: {
    color: "#ffffff",
    ...boldFont,
    fontSize: getRelativeFontSize(4),
    marginLeft: "8px",
    wordBreak: "break-all",
  },
} as const;

export default appDrawerStyles;
