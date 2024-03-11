import {
  boldFont,
  getRelativeFontSize,
  mediumFont,
  theme,
} from "../../utils/styles";

const landingPageStyles = {
  footer: {
    bottom: 0,
    alignItems: "center",
    width: "100%",
    position: "absolute",
    [theme.breakpoints.down("md")]: {
      alignItems: "center",
    },
  },
  footerTypo: {
    ...mediumFont,
    textAlign: "center",
  },
  logo: {
    display: "flex",
    marginTop: 10,
    mx: 4,
    [theme.breakpoints.down("md")]: {
      left: "35px",
    },
  },
  welcomeText: {
    mx: 4,
    ...boldFont,
    fontSize: getRelativeFontSize(4),
  },
} as const;

export default landingPageStyles;
