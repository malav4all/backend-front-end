import { boldFont, getRelativeFontSize } from "../../utils/styles";

const PageNotFoundStyles = {
  mainContainer: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  fontSize: {
    ...boldFont,
    fontSize: getRelativeFontSize(10),
  },
} as const;

export default PageNotFoundStyles;
