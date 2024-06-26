import {
  boldFont,
  theme,
  primaryHeadingColor,
  getRelativeFontSize,
  regularFont,
  purpleThemedSelectComponent,
  pureWhiteColor,
  pinkThemedMenuItems,
  headerColor,
} from "../../../../utils/styles"

const journeyReportStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: headerColor,
    padding: "16px 3rem",
    paddingBottom: "64px",
    paddingTop: "35px",
  },

  heading: {
    fontFamily: "Geist_Medium",
    color: primaryHeadingColor,
    fontSize: "2rem",
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
}

export default journeyReportStyles
