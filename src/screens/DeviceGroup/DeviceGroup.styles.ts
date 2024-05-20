import {
  boldFont,
  theme,
  primaryHeadingColor,
  getRelativeFontSize,
} from "../../utils/styles";

const deviceGroupStyles = {
  divderResponsive: {
    width: "100px",
    borderColor: "#828282",
    [theme.breakpoints.down("md")]: {
      width: "0px",
      margin: "0px",
    },
  },

  mainSection: {
    padding: theme.spacing(2),
    paddingTop: "2px",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(0),
    },
  },
  mainCardHeading: {
    ...boldFont,
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    margin: "16px 0 0 0",
    width: "100%",
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
  },
};

export default deviceGroupStyles;
