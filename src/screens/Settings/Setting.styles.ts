import {
  boldFont,
  getRelativeFontSize,
  primaryHeadingColor,
  theme,
} from "../../utils/styles";

const SettingStyles = {
  headerBackgroundColor: {
    backgroundColor: "#f1edff",
    padding: "35px 31px 31px 32px",
  },
  settingsTitle: {
    fontFamily: "Geist_Light",
    fontSize: "2rem",
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(4),
      marginBottom: theme.spacing(1),
    },
  },
} as const;

export default SettingStyles;
