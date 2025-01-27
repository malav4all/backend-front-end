import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  headerColor,
  inputLabelRequiredColor,
  lightTextColor,
  mediumFont,
  pinkDarkColor,
  primaryHeadingColor,
  pureWhiteColor,
  purpleThemedSelectComponent,
  regularFont,
  semiBoldFont,
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
  headerBackgroundColor: {
    backgroundColor: "#15152E",
    padding: "35px 0px 25px 20px",
  },
  settingsTitle: {
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    color: "white",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
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
    ...semiBoldFont,
    marginBottom: "8px",
    fontSize: "14px",
  },
  star: {
    color: inputLabelRequiredColor,
    ...boldFont,
  },
  dropDownStyle: {
    height: "47px",
    padding: "2px",
    width: "100%",
    borderRadius: "5px",
    [theme.breakpoints.down("lg")]: {
      marginBottom: "5px",
    },
    ...regularFont,
    ...purpleThemedSelectComponent,
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
  accountTypeErrorMessage: {
    fontSize: "0.900rem", // Keep this consistent with other error messages
    color: theme.palette.error.main,
    marginTop: "4px",
    maxWidth: "250px", // Adjust as necessary to fit within the layout
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    paddingLeft: "10px",
  },
} as const;

export default AccountStyles;
