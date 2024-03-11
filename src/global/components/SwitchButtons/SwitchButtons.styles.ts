import {
  boldFont,
  borderRadius,
  customButtonStyle,
  infoTextColor,
  primaryBackgroundColor,
  primaryColor,
} from "../../../utils/styles";
import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const switchButtonsStyles = makeStyles((theme: Theme) => ({
  buttonsContainer: {
    display: "flex",
    flex: 1,
    backgroundColor: primaryBackgroundColor,
    borderRadius: borderRadius,
  },
  activeButton: {
    ...customButtonStyle,
    ...boldFont,
    display: "flex",
    flex: 1,
    backgroundColor: primaryColor,
    color: "white",
    "&:hover": {
      backgroundColor: primaryColor,
    },
  },
  inactiveButton: {
    ...customButtonStyle,
    ...boldFont,
    display: "flex",
    flex: 1,
    backgroundColor: "transparent",
    color: infoTextColor,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
}));

export default switchButtonsStyles;
