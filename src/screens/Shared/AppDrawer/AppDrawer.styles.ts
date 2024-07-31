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
  borderColor,
} from "../../../utils/styles";

const textColor = "#fffff0"; // Define the fixed text color

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
    color: textColor,
    borderRight: "1px solid #21284D",
  },
  drawerContainerBox: {
    position: "relative",
    transition: "width 0.2s ease-in-out",
    color: textColor,
  },
  drawerIconBox: {
    padding: "0.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "absolute",
    top: "26px",
    color: textColor,
  },
  openDrawerIconBox: {
    borderRadius: "5px",
    right: 0,
    marginTop: "-3px",
    marginRight: "10px",
    boxShadow: "-7px 1px 14px 0 rgba(0, 0, 0, 0.08)",
  },
  closedDrawerIconBox: {
    borderRadius: "5px",
    right: 16,
    opacity: 0.8,
  },
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
    color: textColor,
    borderRight: "1px solid #374278",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
  },
  logoutSection: {
    padding: "16px",
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
    color: textColor,
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
    margin: "8px auto",
  },
  openDrawerListItemIcon: {
    minWidth: "35px",
  },
  closedDrawerListItemArrowIcon: { maxHeight: "20px" },
  closedDrawerListItemIcon: {
    minWidth: "22px",
    color: textColor,
  },
  subMenuItems: {
    borderLeft: "4px solid",
  },
  closedDrawerSubMenuItem: { paddingLeft: "5px", margin: "4px 0" },
  menuOptionsHeight: {
    height: "75vh",
    overflowY: "auto",
    overflowX: "hidden",
    [theme.breakpoints.down("xs")]: {
      height: "50vh",
    },
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      padding: "1rem",
      backgroundColor: "#5F22E1",
      "&:hover": {
        backgroundColor: "#5F22E1", 
      },
    },
  },
  menuOptionListItem: {
    ...mediumFont,
    cursor: "pointer",
    borderLeft: "4px solid transparent",
    color: textColor,
  },
  selectedMenuOptionListItem: {
    display: "flex",
    borderLeft: "4px solid",
    height: "30px",
    fontWeight: "400",
    color: textColor,
  },
  menuOption: {
    display: "flex",
    textDecoration: "none",
    ...ultraBlackFont,
    flexDirection: "column",
    cursor: "pointer",
    margin: "0 10px",
    color: textColor,
  },
  selectedMenuOption: {
    display: "flex",
    ...ultraBlackFont,
    fontWeight: "900",
    textDecoration: "none",
    backgroundColor: "#5F22E1",
    flexDirection: "column",
    cursor: "pointer",
    margin: "0 10px",
    color: textColor,
  },
  selectedSubMenuOption: {
    display: "flex",
    ...lightFont,
    textDecoration: "none",
    flexDirection: "column",
    marginBottom: "15px",
    color: textColor,
  },
  navBarLabel: {
    ...lightFont,
    color: textColor,
  },
  listItemIconBox: {
    display: "flex",
    alignItems: "center",
    justifyItem: "center",
    color: textColor,
  },
  listItemTextBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: textColor,
  },
  logoBox: {
    display: "flex",
    padding: "0rem 1rem",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: "27px",
    color: textColor,
  },
  workText: {
    ...boldFont,
    display: "flex",
    fontSize: getRelativeFontSize(21),
    [theme.breakpoints.down("xl")]: {
      fontSize: getRelativeFontSize(17),
    },
    color: textColor,
  },
  sageText: {
    ...boldFont,
    fontSize: getRelativeFontSize(21),
    [theme.breakpoints.down("xl")]: {
      fontSize: getRelativeFontSize(17),
    },
    color: textColor,
  },
  supportTicketBox: {
    borderRadius: "15px",
    mx: 5,
    mt: 1,
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xl")]: {},
    marginBottom: "10%",
    color: textColor,
  },
  btnBox: {
    ...ultraBlackFont,
    textTransform: "none",
    color: textColor,
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
    color: textColor,
    "& img": {
      width: "125px",
      height: "auto",
    },
  },
  getCampaignIcon: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    color: textColor,
  },
  getCampaignImg: {
    width: "137px",
    height: "auto",
  },
  getCampaignPara: {
    fontSize: "14px",
    lineHeight: "20px",
    textAlign: "center",
    ...ultraBlackFont,
    margin: "10px 0",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
    color: textColor,
  },
  logOutWrapper: {
    height: "10vh",
    display: "flex",
    padding: "0 16px",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "15px",
    [theme.breakpoints.down("xl")]: {},
    color: textColor,
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
    color: textColor,
  },
  logOutLeft: {
    display: "flex",
    alignItems: "center",
    color: textColor,
  },
  logoutTooltipText: {
    padding: "10px",
    fontSize: "14px",
    ...regularFont,
    color: textColor,
  },
  logoutImageStyle: { width: "25px", height: "auto", cursor: "pointer" },
  squareBox: {
    width: "25px",
    height: "25px",
    borderRadius: "100%",
    background: "#5F22E1",
    padding: "0.3rem",
    display: "flex",
    fontSize: "0.8rem",
    alignItems: "center",
    justifyContent: "center",
    margin: "0px 5px 0px 0px",
    color: textColor,
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
    color: textColor,
  },
  avatarStyle: {
    ...boldFont,
    fontSize: getRelativeFontSize(8),
    color: textColor,
  },
  avatarFirstName: {
    ...boldFont,
    fontSize: getRelativeFontSize(4),
    marginLeft: "8px",
    wordBreak: "break-all",
    color: textColor,
  },
} as const;

export default appDrawerStyles;
