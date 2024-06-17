import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  mainContainer,
  theme,
  primaryHeadingColor,
  pinkDarkColor,
  mediumFont,
  regularFont,
  inputLabelRequiredColor,
  pinkThemedMenuItems,
  purpleThemedSelectComponent,
  pureWhiteColor,
  headerColor,
} from "./../../utils/styles";
const reportStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: headerColor,
    padding: "16px",
    paddingBottom: "64px",
    paddingTop: "35px",
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

export default reportStyles;
