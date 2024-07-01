import { Theme } from "@mui/material";
import {
  boldFont,
  theme,
  primaryHeadingColor,
  getRelativeFontSize,
} from "../../utils/styles";

const deviceGroupStyles = (theme: Theme) => ({
  dividerResponsive: {
    width: "100px",
    borderColor: theme.palette.divider,
    [theme.breakpoints.down("md")]: {
      width: "0px",
      margin: "0px",
    },
  },
  mainSection: {
    padding: "30px",
    paddingTop: "2px",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(0),
    },
  },
  mainCardHeading: {
    ...boldFont,
    fontFamily: "Geist_Medium",
    fontSize: "24px",
    margin: "16px 0 0 0",
    width: "100%",
    color: theme.palette.primary.contrastText,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
  },
});

export default deviceGroupStyles;
