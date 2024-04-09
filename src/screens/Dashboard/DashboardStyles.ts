import {
  boldFont,
  getRelativeFontSize,
  regularFont,
  theme,
  pureWhiteColor,
  primaryHeadingColor,
  mediumFont,
  textLightColor,
  purpleThemedSelectComponent,
  pinkThemedMenuItems,
} from "../../utils/styles";
import thoughtsbg from "../../assets/images/dashboard/quotesbg.webp";

const dashboardStyles = {
  thoughtsBox: {
    height: "100%",
    backgroundImage: "url(" + thoughtsbg + ") ",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.07)",
    borderRadius: "8px",
    textAlign: "center",
    padding: "0px",
  },
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
      marginTop: theme.spacing(1),
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
    ...boldFont,
    color: textLightColor,
  },
  statsValue: {
    ...boldFont,
    fontSize: getRelativeFontSize(10),
  },
  dropdown: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    height: "40px",
    width: "200px",
    backgroundColor: pureWhiteColor,
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
    alignItems: "center",
    backgroundColor: "#FCF5FF",
    padding: "16px",
    paddingBottom: "64px",
    paddingTop: "35px",
  },
  container: {
    padding: "8px",
    backgroundColor: "white",
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
    backgroundColor: "#FCF5FF",
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
    borderRadius: "12px",
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
  dropDownStyle: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    backgroundColor: pureWhiteColor,
    height: "47px",
    padding: "2px",
    width: " 180px",
    borderRadius: "12px",
    fontSize: "14px",
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
} as const;

export default dashboardStyles;
