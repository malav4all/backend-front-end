import { mediumFont, regularFont, theme } from "../../../utils/styles";

const customTabsStyles = {
  headerBox: {
    background: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {},
  },
  mainBox: {
    padding: "15px 30px",
  },
  customTabsText: {
    ...regularFont,
  },
  outerTabBox: {
    marginTop: "10px",
    borderBottom: "none",
  },
  tab: {
    "& .MuiButtonBase-root-MuiTab-root": {
      padding: "12px 2px",
      color: "#FFFFFF !important",
    },
    "& .Mui-selected": {
      color: "#FFFFFF !important",
    },
  },
  tabBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2px",
    borderRadius: "5px",
    height: "40px",
    width: "100%",
  },
  active: {
    backgroundColor: "#5F22E2",
    textDecoration: "none",
    color: "#ffffff",
  },
  inActive: {
    opacity: 0.6,
    color: "#ffffff",
  },
  tabText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Geist_Regular",
    fontWeight: 500,
    margin: theme.spacing(1),
    textTransform: "none",
    color: "#FFFFFF",
  },
  counts: {
    marginLeft: theme.spacing(1),
    width: "26px",
    opacity: "0.5",
    borderRadius: "6px",
    ...mediumFont,
  },
  searchIcon: {
    marginLeft: theme.spacing(1),
  },
  input: {
    border: "1px solid #E7E7E7",
  },
  btnBox: {
    color: "white",
    textTransform: "none",
    justifyContent: "space-between",
  },
  addBox: {
    background: "#4F31BC",
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    color: "#FFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default customTabsStyles;
