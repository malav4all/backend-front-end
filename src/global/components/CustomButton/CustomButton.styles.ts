import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  centerItemFlex,
  customButtonStyle,
  disabledBackgroundColor,
  mediumFont,
  regularFont,
} from "../../../utils/styles";

const customButtonStyles = {
  btnStyle: {
    ...customButtonStyle,
    ...regularFont,
    width: "80%",
    padding: "10px 20px",
    ...centerItemFlex,
    "&:disabled": {
      color: "rgb(255 255 255 / 50%)",
    },
  },
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
