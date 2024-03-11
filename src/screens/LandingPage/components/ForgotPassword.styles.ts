import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
} from "../../../utils/styles";

const forgotPasswordStyles = {
  submitBtn: {
    width: "100%",
    cursor: "pointer",
    ...mediumFont,
    fontSize: getRelativeFontSize(),
    ...centerItemFlex,
  },
  select: {
    borderRadius: "20px",
    border: "1px solid black",
    width: "100% !important",
  },
  error: {
    borderRadius: "8px",
    outline: "none",
    borderColor: "red !important",
    width: "100% !important",
  },
  loadingBgWrapper: {
    width: "100%",
    height: "100vh",
    background: "rgba(0,0,0,0.2)",
    position: "absolute",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
  },
  label: { display: "flex" },
  labelIcon: { color: "black" },
  labelText: { ...boldFont, marginLeft: "6px" },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "2px",
    fontSize: getRelativeFontSize(5),
    ...boldFont,
  },
  getHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(14),
    mx: 4,
    mt: 8,
  },
  headingCenter: {
    ...mediumFont,
    fontSize: getRelativeFontSize(),
    mt: 2,
  },
  formCenter: {
    ...centerItemFlex,
    px: 4,
  },
  errorStyling: {
    paddingLeft: "10px",
  },
} as const;

export default forgotPasswordStyles;
