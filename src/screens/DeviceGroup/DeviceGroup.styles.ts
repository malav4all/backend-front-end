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
    margin: "32px 0 20px 0",
    width: "100%",
    fontSize: getRelativeFontSize(10),
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
  },
};

export default deviceGroupStyles;
