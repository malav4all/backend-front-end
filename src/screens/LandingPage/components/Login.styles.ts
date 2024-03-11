import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  pinkDarkColor,
  theme,
} from "../../../utils/styles";

const loginStyles = {
  select: {
    borderRadius: "20px",
    border: "1px solid black",
    width: "100% !important",
  },
  categoryTab: {
    ...boldFont,
    fontSize: getRelativeFontSize(3),
    textTransform: "none",
    "&.Mui-selected": {
      color: pinkDarkColor,
    },
  },
  categoryTabsSection: {
    "& .MuiTabs-indicator": {
      backgroundColor: pinkDarkColor,
    },
  },
  error: {
    borderRadius: "8px",
    outline: "none",
    borderColor: "red !important",
    width: "100% !important",
  },
  label: { display: "flex", height: "20px", marginTop: "30px" },
  labelIcon: { color: "black" },
  labelText: {
    marginLeft: "6px",
    ...boldFont,
  },
  formCenter: {
    ...centerItemFlex,
  },
  headingCenter: {
    ...mediumFont,
    fontSize: getRelativeFontSize(),
    mt: 2,
  },
  textRadious: {
    borderRadius: "100px",
  },
  getHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(14),
    mx: 4,
    mt: 8,
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: getRelativeFontSize(5),
    ...boldFont,
  },
  center: {
    ...boldFont,
    alignItem: "center",
  },
  getLoginScreen: {
    height: "100%",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      mt: 10,
    },
  },
  forgetPasswordWrapper: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    mt: 2,
  },
  signBtn: {
    width: "100%",
  },
  errorStyling: {
    paddingLeft: "10px",
  },
} as const;

export default loginStyles;
