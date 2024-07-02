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
  theme,
} from "../../../utils/styles";

const AccountStyles = {
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
    backgroundColor: "#00000000",
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
  searchInput: {
    width: "100%",
    height: "50px",
  },
  searchBaronClick: {
    border: "1px solid Blue ! Important",
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
  mainCardInputsSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1),
    },
  },
  campaignerTable: {
    minWidth: "300px",
    width: "100%",
    overflow: "auto",
  },
  searchInputWrapper: {
    display: "flex",
    alignItem: "center",
  },
  addUserButton: {
    width: "185px",
  },
  emailStyle: {
    color: pinkDarkColor,
    fontSize: "15px",
  },
  userDialogTitle: {
    boldFont,
    fontSize: "18px",
    paddingLeft: "20px",
  },
  boldFonts: {
    ...boldFont,
    fontSize: getRelativeFontSize(13),
    textAlign: "center",
  },
} as const;

export default AccountStyles;
