import { getRelativeFontSize, mediumFont } from "../../utils/styles";

const UnauthorizedPageStyles = {
  mainContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  fontSize: {
    ...mediumFont,
    fontSize: getRelativeFontSize(6),
  },
} as const;

export default UnauthorizedPageStyles;
