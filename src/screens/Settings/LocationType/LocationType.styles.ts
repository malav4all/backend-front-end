import { Padding } from "@mui/icons-material";
import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  lightTextColor,
  mediumFont,
  pinkDarkColor,
  primaryHeadingColor,
  regularFont,
  semiBoldFont,
  theme,
} from "../../../utils/styles";

const LocationTypeStyles = {
  profileHeaderName: {
    fontSize: getRelativeFontSize(8),
    ...boldFont,
    color: primaryHeadingColor,
  },
  mainCardHeading: {
    ...regularFont,
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
  headerBackgroundColor: {
    backgroundColor: theme.palette.background.paper,
    padding: "2rem 1.7rem",
  },
  settingsTitle: {
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    color: theme.palette.text.primary,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
  },
  profileHeaderEmail: {
    color: lightTextColor,
  },

  pageSubtitle: {
    fontSize: getRelativeFontSize(6),
    ...boldFont,
    color: primaryHeadingColor,
  },

  radioButtonlabel: {
    ...regularFont,
    fontSize: "16px",
    lineHeight: "20px",
    fontStyle: "normal",
    color: lightTextColor,
  },

  textField: {
    width: "100%",
    borderRadius: "12px",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      "&::placeholder": {
        ...mediumFont,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },

  nameField: {
    ...boldFont,
    color: "#212121",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },

  radioChecked: {
    "&.Mui-checked": {
      color: pinkDarkColor,
    },
  },

  centerItemFlex: {
    ...centerItemFlex,
    paddingBottom: "20px",
  },

  profileFooter: {
    display: "flex",
    justifyContent: "center",
  },

  saveBtnStyle: {
    width: "200px",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },

  editBtnStyle: {
    width: "100%",
    whiteSpace: "nowrap",
    [theme.breakpoints.down("sm")]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(1),
    },
  },

  cancelButtonStyle: {
    color: "#212121 !important",

    "&:hover": {
      background: "none",
    },
  },

  boldFonts: {
    ...boldFont,
    fontSize: getRelativeFontSize(13),
    textAlign: "center",
  },

  testAreaStyle: {
    borderColor: "rgba(0,0,0,0.2)",
    width: "100%",
    background: "none",
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px !important",
    },
  },

  dialogFooter: {
    display: "flex",
    gap: "10px",
    ...centerItemFlex,
    width: "100%",
    margin: "20px",
    justifyContent: "center",
    "& button": {
      width: "120px",
    },
  },

  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "10px",
    },
  },

  label: {
    ...semiBoldFont,
    fontSize: "14px",
    marginBottom: "8px",
  },

  star: {
    color: inputLabelRequiredColor,
    ...boldFont,
  },

  dropDownStyle: {
    ...regularFont,
    height: "42px",
    padding: "2px",
    width: "100%",
    borderRadius: "5px",
    fontSize: "16px",
  },

  placeholderText: {
    ...regularFont,
    color: "#999999",
  },

  optionStyle: {
    ...regularFont,
  },

  checkbox: {
    "&.MuiCheckbox-colorPrimary": { color: pinkDarkColor },
  },
} as const;

export default LocationTypeStyles;
