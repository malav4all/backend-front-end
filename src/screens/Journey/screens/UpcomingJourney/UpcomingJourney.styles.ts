import {
  boldFont,
  getRelativeFontSize,
  theme,
  primaryHeadingColor,
  regularFont,
  pinkThemedMenuItems,
  purpleThemedSelectComponent,
  pureWhiteColor,
} from "../../../../utils/styles";
const upcomingJourneyStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#d1bbff",
    padding: "16px",
    paddingBottom: "64px",
    paddingTop: "35px",
  },
  mainCardHeading: {
    ...boldFont,
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    margin: "16px 0 0px 0",
    width: "100%",
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
  },
  heading: {
    ...boldFont,
    color: primaryHeadingColor,
    fontSize: getRelativeFontSize(7),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
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

export default upcomingJourneyStyles;
