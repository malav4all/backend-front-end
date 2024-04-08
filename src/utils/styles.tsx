import Checkbox, { CheckboxProps } from "@mui/material/Checkbox";
import InputBase from "@mui/material/InputBase";
import Radio, { RadioProps } from "@mui/material/Radio";
import { createStyles } from "@mui/styles";
import { Theme } from "@mui/material";
import Switch from "@mui/material/Switch";
import { CSSProperties, withStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const borderRadius = "5px";
const primaryColor = "#0d3057";
const primaryBackgroundColor = "#FCFCFC";
const borderColor = "rgba(0, 0, 0, 0.12)";
const borderStyle = "1px solid " + borderColor;
const infoTextColor = "#888888";
const disabledBackgroundColor = "#888888";
const defaultFontSize = 14;
const defaultBoxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%)";
const drawerWidth = 300;
const textLightColor = "#666666";
const purplePrimaryColor = "#845ADF";
const pinkDarkColor = "#9063F2";
const pureWhiteColor = "#ffffff";
const primaryHeadingColor = "#001529";
const primaryGreenColor = "#adc804";
const primaryBlackColor = "#000000";
const primaryBlue = "#845ADF";
const lightTextColor = "#666";
const lightPinkColor = "#f1edff";
const activeMenuColor = "#845ADF";
const darkPurpledColor = "#0675f9";
const inputLabelRequiredColor = "red";
const buttonWhiteBg = "#E7E7E7";
const lightBgColor = "#FAF5FD";
const chipBackgroundColor = "#FFF1F9";
const completeChipBackgroundColor = "#E7EEBD";
const activeMenuBackgroundColor = "#f1edff";
const cardBorderColor = "#f0f5f5";
const warningColor = "red";

const mainContainer: CSSProperties = {
  margin: "20px",
};
const mainFlexContainer: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};
const blackFont: CSSProperties = {
  fontFamily: "SourceSans3_Black",
  fontWeight: 900,
  fontStyle: "normal",
};

const boldFont: CSSProperties = {
  fontFamily: "SourceSans3_Bold",
  fontWeight: 700,
};
const leftItemFlex: CSSProperties = {
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
};

const mediumFont: CSSProperties = {
  fontFamily: "SourceSans3_Medium",
  fontWeight: 500,
};
const rowItemFlex: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};
const regularFont: CSSProperties = {
  fontFamily: "SourceSans3_Regular",
  fontWeight: 400,
};

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Poppins_Regular",
      "Poppins_Medium",
      "Poppins_Bold",
      "Poppins_Black",
      "sans-serif",
    ].join(","),
  },
});

const getRelativeFontSize = (value: number = 0) => {
  let size = defaultFontSize + value;
  return size + "px";
};

const customButtonStyle: CSSProperties = {
  borderRadius: "5px",
  border: "none",
  fontSize: getRelativeFontSize(),
  textAlign: "center",
  backgroundColor: purplePrimaryColor,
  padding: "10px 15px",
  // boxShadow: " 4px 4px 30px rgba(0, 0, 0, 0.03)",
  boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
  color: "#FFFFFF",
  cursor: "pointer",
  textTransform: "none",
  height: "47px",
  transition: "all .3s ease",
  "&:hover": {
    background: "#9063f2",
  },
};

const customTextFieldStyle: CSSProperties = {
  borderRadius: borderRadius,
  position: "relative",
  border: "none",
  fontSize: getRelativeFontSize(2),
  backgroundColor: primaryBackgroundColor,
  padding: "10px 15px",
  boxShadow: "none",
  width: "100%",
};

const headingText: CSSProperties = {
  display: "inline-block",
  fontSize: getRelativeFontSize(8),
};

const centerItemFlex: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const centerItemAbsolute: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
};

const purpleThemedSelectComponent: CSSProperties = {
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: darkPurpledColor,
  },
};

const pinkThemedMenuItems: CSSProperties = {
  "&.Mui-selected": {
    "&:hover,&:focus": { backgroundColor: "rgba(187, 0, 112, 0.1)" },
  },
  "&:hover": { backgroundColor: lightPinkColor },
  "&:focus": { backgroundColor: "rgba(187, 0, 112, 0.1)" },
};

const CustomInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
      backgroundColor: theme.palette.common.black,
      border: "1px solid #ced4da",
      borderRadius: borderRadius,
      padding: "0 5px",
    },
    input: {
      position: "relative",
      fontSize: getRelativeFontSize(),
      width: "100%",
      padding: "10px 12px",
    },
  })
)(InputBase);

const CustomSwitch = withStyles({
  switchBase: {
    color: "grey",
    "&$checked": {
      color: primaryColor,
      "& + $track": {
        backgroundColor: primaryColor,
      },
    },
    "&$checked + $track": {
      color: primaryColor,
    },
  },
  track: { backgroundColor: "grey" },
  checked: {},
})(Switch);

const CustomCheckbox = withStyles({
  root: {
    color: primaryColor,
    "&$checked": {
      color: primaryColor,
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const CustomRadio = withStyles({
  root: {
    color: primaryColor,
    "&$checked": {
      color: primaryColor,
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />);

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(4),
      },
      backgroundColor: theme.palette.common.white,
      border: "1px solid #ced4da",
      borderRadius: "5px",
      padding: "5px 5px",
      width: "300px",
    },
    input: {
      position: "relative",
      fontSize: getRelativeFontSize(),
      width: "100%",
      padding: "10px 12px",
      "&::placeholder ": {
        ...regularFont,
      },
    },
  })
)(InputBase);

export {
  borderRadius,
  primaryColor,
  disabledBackgroundColor,
  primaryBackgroundColor,
  borderColor,
  borderStyle,
  infoTextColor,
  defaultBoxShadow,
  customButtonStyle,
  customTextFieldStyle,
  mainFlexContainer,
  rowItemFlex,
  leftItemFlex,
  headingText,
  centerItemFlex,
  centerItemAbsolute,
  purpleThemedSelectComponent,
  pinkThemedMenuItems,
  CustomInput,
  CustomSwitch,
  CustomCheckbox,
  CustomRadio,
  regularFont,
  blackFont,
  boldFont,
  mediumFont,
  getRelativeFontSize,
  theme,
  mainContainer,
  drawerWidth,
  textLightColor,
  purplePrimaryColor,
  pinkDarkColor,
  pureWhiteColor,
  primaryHeadingColor,
  primaryGreenColor,
  primaryBlue,
  lightTextColor,
  primaryBlackColor,
  lightPinkColor,
  activeMenuColor,
  darkPurpledColor,
  inputLabelRequiredColor,
  buttonWhiteBg,
  lightBgColor,
  chipBackgroundColor,
  completeChipBackgroundColor,
  warningColor,
  cardBorderColor,
  activeMenuBackgroundColor,
};
