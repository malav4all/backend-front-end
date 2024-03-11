import {
  boldFont,
  getRelativeFontSize,
  primaryHeadingColor,
  theme,
} from "../../utils/styles";

 const SettingStyles = {
  headerBackgroundColor: {
    backgroundColor: "#ECF9FF",
    padding: "35px 31px 31px 32px",
  },
  settingsTitle: {
    fontSize: getRelativeFontSize(10),
    ...boldFont,
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
  },
} as const;

export default SettingStyles;
