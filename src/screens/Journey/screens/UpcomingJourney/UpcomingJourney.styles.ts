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
    backgroundColor: "#FCF5FF",
    padding: "16px",
    paddingBottom: "64px",
    paddingTop: "35px",
  },
  mainCardHeading: {
    ...boldFont,
    margin: "32px 0 20px 0",
    width: "100%",
    fontSize: getRelativeFontSize(10),
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
