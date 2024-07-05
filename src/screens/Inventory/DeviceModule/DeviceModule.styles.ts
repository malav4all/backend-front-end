import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  lightTextColor,
  mediumFont,
  pinkDarkColor,
  primaryHeadingColor,
  pureWhiteColor,
  regularFont,
  semiBoldFont,
  theme,
} from "../../../utils/styles";

const DeviceModelStyles = {
  profileHeaderName: {
    fontSize: getRelativeFontSize(8),
    ...boldFont,
    color: primaryHeadingColor,
  },
  profileHeaderEmail: {
    color: lightTextColor,
  },
  pageSubtitle: {
    fontSize: getRelativeFontSize(6),
    ...boldFont,
    color: primaryHeadingColor,
  },
  mainCardHeading: {
    ...boldFont,
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
  label: {
    ...semiBoldFont,
    fontSize: "14px",
    marginBottom: "8px",
    // padding: "0px 12px",
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
    margin: "0 10px",
    marginTop: "16px",
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
    backgroundColor: pureWhiteColor,
    border: "1px solid #E7E7E7",
    "&:hover": {
      background: "none",
    },
  },
  testAreaStyle: {
    borderColor: "rgba(0,0,0,0.2)",
    background: "none",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
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
    ...boldFont,
    marginBottom: "8px",
  },
  star: {
    color: inputLabelRequiredColor,
    ...boldFont,
  },
  dropDownStyle: {
    ...regularFont,
    // ...purpleThemedSelectComponent,
    backgroundColor: pureWhiteColor,
    height: "47px",
    padding: "2px",
    width: "100%",
    borderRadius: "12px",
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

export default DeviceModelStyles;
