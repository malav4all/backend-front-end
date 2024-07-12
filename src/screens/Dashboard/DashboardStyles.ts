import {
  boldFont,
  getRelativeFontSize,
  regularFont,
  theme,
  offWhiteColor,
  pureWhiteColor,
  primaryHeadingColor,
  mediumFont,
  textLightColor,
  purpleThemedSelectComponent,
  pinkThemedMenuItems,
  headerColor,
} from "../../utils/styles";

import thoughtsbg from "../../assets/images/dashboard/quotesbg.webp";
import { Height } from "@mui/icons-material";

const dashboardStyles = {
  campaignDate: {
    color: "#929292",
    ...mediumFont,
    fontSize: getRelativeFontSize(2),
    mb: 1,
    paddingLeft: "10px",
  },
  dateRangeText: {
    ...boldFont,
    fontSize: getRelativeFontSize(),
  },
  emailDropDownStyle: {
    "& .MuiOutlinedInput-root": {
      padding: "0, 9px",
      height: "47px",
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },
  campaignType: {
    color: "#B1B1B1",
    ...regularFont,
    fontSize: getRelativeFontSize(),
    paddingLeft: "10px",
  },
  heading: {
    ...boldFont,
    color: primaryHeadingColor,
    fontSize: getRelativeFontSize(7),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(2),
    },
  },
  noactivityheading: {
    ...boldFont,
    color: "#545454",
    fontSize: getRelativeFontSize(2),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
  },
  statsTitle: {
    ...regularFont,
    color: textLightColor,
  },
  statsValue: {
    ...regularFont,
    fontSize: getRelativeFontSize(42),
    lineHeight: "1",
    marginTop: "1rem",
  },
  dropdown: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    height: "40px",
    width: "200px",
    backgroundColor: offWhiteColor,
    borderRadius: "8px",
    color: "#22222C",
    border: 0,
    boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.03)",
    "&:hover": {
      border: 0,
    },
  },
  dropdownOptions: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  box: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
  },
  boxStyle: {
    marginTop: "10px",
    padding: "16px",
  },
  dashboardDataSize: {
    fontSize: getRelativeFontSize(3),
    ...boldFont,
    cursor: "pointer",
  },
  inline: {
    display: "flex",
  },
  header: {
    display: "flex",
    marginTop: "0rem",
    alignItems: "center",
    // backgroundColor: headerColor,
    padding: "0px 25px",
    // paddingBottom: "64px",
    height: "5rem",
    // paddingTop: "35px",
  },
  container: {
    padding: "8px",
    backgroundColor: "red",
    borderRadius: "8px",
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
  },
  containerTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(6),
  },
  featureDescription: {
    ...mediumFont,
    padding: "8px",
  },
  upgradeBtn: {
    ...regularFont,
    "&:hover": {
      backgroundColor: "#ffffff",
    },
    width: "180px",
    color: "#444444",
    backgroundColor: "#FFFFFF",
    padding: 1,
    textTransform: "capitalize",
    [theme.breakpoints.down("lg")]: {
      width: "auto",
    },
    marginBottom: "16px",
  },
  upgradeNowText: {
    color: "#494949",
    ...mediumFont,
    textAlign: "center",
    fontSize: getRelativeFontSize(1),
  },
  dates: {
    ...regularFont,
    color: "#ADADAD",
    fontSize: getRelativeFontSize(),
  },
  statusBox: {
    ml: 1,
    ...regularFont,
    backgroundColor: headerColor,
    padding: 1,
    fontSize: getRelativeFontSize(),
  },
  tags: {
    ...regularFont,
    color: "#595959",
    fontSize: getRelativeFontSize(),
  },
  recactivitydropdown: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    height: "30px",
    width: "120px",
    backgroundColor: pureWhiteColor,
    borderRadius: "5px",
    color: "#22222C",
    border: 0,
    boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.03)",
    "&:hover": {
      border: 0,
    },
  },
  bgColor: {
    color: "#ffffff",
    backgroundColor: "#1a0224",
    borderRadius: "8px",
    padding: "2px 0",
  },
  headingMargins: {
    fontSize: getRelativeFontSize(7),
    ...boldFont,
    marginBottom: 1,
  },
  chartEmptyMsg: {
    ...regularFont,
  },
  graphLegend: {
    ...regularFont,
    fontSize: getRelativeFontSize(),
    fontStyle: "italic",
  },
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#00000000",
    border: "1px solid #E7E7E7",
    "&:hover": {
      background: "none",
    },
  },
  dropDownStyle: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    borderColor: theme.palette.divider,
    width: " 120px",
    borderRadius: "5px",
    fontSize: "12px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
    alignSelf: "center",
  },
} as const;

export default dashboardStyles;
