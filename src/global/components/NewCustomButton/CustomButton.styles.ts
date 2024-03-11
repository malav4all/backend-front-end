import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  centerItemFlex,
  customButtonStyle,
  darkPurpledColor,
  disabledBackgroundColor,
  lightPinkColor,
  mediumFont,
  purplePrimaryColor,
} from "../../../utils/styles";

const customButtonStyles = {
  btnStyle: {
    ...customButtonStyle,
    ...mediumFont,
    borderRadius: "4px",
    padding: "8px",
    ...centerItemFlex,
    "&:disabled": {
      color: "rgb(255 255 255 / 50%)",
    },
    "&:hover": {
      background: purplePrimaryColor,
    },
  },
  outlined: {},
  glydeGif: {
    width: "15px",
    height: "15px",
  },
  loadingStyle: {
    color: "white",
    width: "25px !important",
    height: "25px !important",
  },
  disabled: {
    color: disabledBackgroundColor,
  },
};

export default customButtonStyles;
