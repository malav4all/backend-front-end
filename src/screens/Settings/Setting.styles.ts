import {
  boldFont,
  getRelativeFontSize,
  headerColor,
  primaryHeadingColor,
  theme,
} from "../../utils/styles"

const SettingStyles = {
  headerBackgroundColor: {
    backgroundColor: headerColor,
    padding: "35px 31px 31px 32px",
  },
  settingsTitle: {
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    color: "white",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
  },
} as const

export default SettingStyles
