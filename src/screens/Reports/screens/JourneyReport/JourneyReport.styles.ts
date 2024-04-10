import {
  boldFont,
  theme,
  primaryHeadingColor,
  getRelativeFontSize,
} from "../../../../utils/styles";

const journeyReportStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FCF5FF",
    padding: "16px",
    paddingBottom: "64px",
    paddingTop: "35px",
  },
  heading: {
    ...boldFont,
    color: primaryHeadingColor,
    fontSize: getRelativeFontSize(7),
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
  },
};

export default journeyReportStyles;
