import {
  theme,
  primaryHeadingColor,
  regularFont,
  pinkThemedMenuItems,
  purpleThemedSelectComponent,
  pureWhiteColor,
  headerColor,
} from "../../../../utils/styles";
const alertReportStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: headerColor,
    padding: "16px 0.5rem",
    paddingBottom: "64px",
    paddingTop: "35px",
  },
  heading: {
    fontFamily: "Geist_Medium",
    color: primaryHeadingColor,
    fontSize: "2rem",
    marginLeft: "0.5rem",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
  },
  dropDownStyle: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    backgroundColor: pureWhiteColor,
    height: "42px",
    width: " 180px",
    borderRadius: "5px",
    fontSize: "14px",
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
} as const;

export default alertReportStyles;
