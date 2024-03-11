import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  boldFont,
  customButtonStyle,
  mediumFont,
  primaryColor,
} from "../../../utils/styles";

const floatButtonStyles = makeStyles((theme: Theme) => ({
  floatingBtn: {
    position: "fixed",
    bottom: "0px",
    left: "0px",
    right: "0px",
    margin: "10px",
  },
  btnStyle: {
    ...customButtonStyle,
    ...mediumFont,
    width: "100%",
    boxShadow: "5px 6px 5px 0px #00000029",
    "&:hover": {
      backgroundColor: primaryColor,
      color: "white",
    },
    display: "flex",
    justifyContent: "space-between",
  },
  noOfItems: {
    ...mediumFont,
    opacity: "80%",
  },
  price: {
    ...mediumFont,
    opacity: "80%",
  },
  label: {
    ...boldFont,
  },
  glydeGif: {
    width: "25px",
    height: "25px",
  },
  loading: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default floatButtonStyles;
