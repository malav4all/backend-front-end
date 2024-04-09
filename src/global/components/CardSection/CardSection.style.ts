import {
  centerItemFlex,
  getRelativeFontSize,
  regularFont,
  theme,
  mediumFont,
  boldFont,
} from "../../../utils/styles";

const CardSectionStyles = {
  centerAlignedBox: {
    ...regularFont,
    ...centerItemFlex,
  },
  cards: {
    maxWidth: 350,
    boxShadow: " 0px 6px 30px rgba(0, 0, 0, 0.08)",
  },
  cardStyles: {
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 2,
    paddingRight: 2,
  },
  whyUsText: {
    fontSize: getRelativeFontSize(30),
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      fontSize: getRelativeFontSize(20),
    },
  },
  Button: {
    ...regularFont,
    fontSize: getRelativeFontSize(2),
    backgroundColor: "#1B1028",
    textTransform: "unset",
    color: "#FFFFFF",
    height: "40px",
    width: "180px",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "none !important",
    "&:hover": {
      backgroundColor: "#1B1028",
      color: "#F5F5F5",
    },
    [theme.breakpoints.down("sm")]: {
      height: "auto",
      marginBottom: 2,
    },
  },
  ButtonMain: {
    textDecoration: " none",
    "&.MuiTypography-root-MuiLink-root": {
      textDecoration: " none",
    },
  },
  title: {
    ...mediumFont,
    textAlign: "center",
    fontSize: getRelativeFontSize(4),
  },
  amount: {
    ...boldFont,
    textAlign: centerItemFlex,
    fontSize: getRelativeFontSize(25),
  },
  startText: {
    fontSize: "11px",
    color: "#666666",
    [theme.breakpoints.down("sm")]: {
      fontSize: "7px",
    },
  },
  validity: {
    ...regularFont,
    display: "flex",
    fontSize: getRelativeFontSize(2),
    color: "#212121",
  },
  asterisks: {
    color: "#C11D85",
    fontWeight: "bold",
  },
  description: {
    ...regularFont,
    fontSize: getRelativeFontSize(0),
    color: "#666666",
    marginBottom: 2,
    [theme.breakpoints.down("md")]: {
      fontSize: "10px",
    },
    [theme.breakpoints.down("lg")]: {
      fontSize: "13px",
    },
  },
  recommendsText: {
    ...regularFont,
    fontSize: getRelativeFontSize(-2),
  },
} as const;
export default CardSectionStyles;
