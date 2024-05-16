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
const primaryBackgroundColor = "#ffffff";
const borderColor = "rgba(0, 0, 0, 0.12)";
const borderStyle = "1px solid " + borderColor;
const infoTextColor = "#888888";
const disabledBackgroundColor = "#888888";
const defaultFontSize = 14;
const defaultBoxShadow = "0 0 0 0.2rem rgb(0 123 255 / 25%)";
const drawerWidth = 240;
const textLightColor = "#666666";
const purplePrimaryColor = "#5F22E2";
const pinkDarkColor = "#ffffff";
const pureWhiteColor = "#ffffff";
const offWhiteColor = "#F0F5F9";
const primaryHeadingColor = "#001529";
const primaryGreenColor = "#adc804";
const primaryBlackColor = "#3C424D";
const primaryBlue = "#5F22E2";
const lightTextColor = "#666";
const lightPinkColor = "#f1edff";
const activeMenuColor = "#5F22E2";
const darkPurpledColor = "#0675f9";
const inputLabelRequiredColor = "red";
const buttonWhiteBg = "#E7E7E7";
const lightBgColor = "#FAF5FD";
const chipBackgroundColor = "#FFF1F9";
const completeChipBackgroundColor = "#E7EEBD";
const activeMenuBackgroundColor = "#f1edff";
const cardBorderColor = "#f0f5f5";
const warningColor = "red";
const primaryBorderColor = "#E7E7E7";
const mainContainer: CSSProperties = {
  margin: "20px",
};
const mainFlexContainer: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
};
const leftItemFlex: CSSProperties = {
  display: "flex",
  alignItems: "left",
  justifyContent: "left",
};

const rowItemFlex: CSSProperties = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
};

const thinFont: CSSProperties = {
  fontFamily: "Geist_Thin",
};

const ultraLightFont: CSSProperties = {
  fontFamily: "Geist_UltraLight",
};

const lightFont: CSSProperties = {
  fontFamily: "Geist_Light",
};

const regularFont: CSSProperties = {
  fontFamily: "Geist_Regular",
};

const mediumFont: CSSProperties = {
  fontFamily: "Geist_Medium",
};

const semiBoldFont: CSSProperties = {
  fontFamily: "Geist_SemiBold",
};

const boldFont: CSSProperties = {
  fontFamily: "Geist_Bold",
};

const blackFont: CSSProperties = {
  fontFamily: "Geist_Black",
};

const ultraBlackFont: CSSProperties = {
  fontFamily: "Geist_UltraBlack",
};


const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      "Geist_Thin",
      "Geist_UltraLight",
      "Geist_Light",
      "Geist_SemiBold",
      "Geist_UltraBlack",
      "Geist_Regular",
      "Geist_Medium",
      "Geist_Bold",
      "Geist_Black",
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
  thinFont,
  ultraLightFont,
  lightFont,
  ultraBlackFont,
  semiBoldFont,
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
  offWhiteColor,
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
  primaryBorderColor,
  activeMenuBackgroundColor,
};
