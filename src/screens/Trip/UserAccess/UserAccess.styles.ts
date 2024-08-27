import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  headerColor,
  inputLabelRequiredColor,
  lightTextColor,
  mediumFont,
  pinkDarkColor,
  pinkThemedMenuItems,
  primaryHeadingColor,
  regularFont,
  semiBoldFont,
  theme,
} from "../../../utils/styles";

const UserAccessStyles = {
  profileHeaderName: {
    fontSize: getRelativeFontSize(8),
    ...boldFont,
    color: primaryHeadingColor,
  },

  profileHeaderEmail: {
    color: lightTextColor,
  },
  headerBackgroundColor: {
    backgroundColor: headerColor,
    padding: "35px 0px 25px 20px",
  },
  settingsTitle: {
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    color: "white",
    marginLeft: "-0.7rem",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
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
    backgroundColor: "#00000000",
    border: "1px solid #E7E7E7",
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
    // padding: "0px 12px",
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

  mainSection: {
    padding: theme.spacing(2),
    paddingTop: "2px",
    marginTop: "2px",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(0),
    },
  },
  inputSection: {
    display: "flex",
    gap: "15px",
  },

  searchBarSection: {
    display: "flex",
    alignItems: "left",
  },
  dialogBox: {
    marginBottom: "10px",
  },
  header: {
    position: "sticky",
    marginBottom: 1,
  },
  body: {
    height: "85vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  loader: {
    ...centerItemFlex,
    marginLeft: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },

  form: {
    centerItemFlex,
    marginBottom: "10px",
    variant: "standard",
    ...boldFont,
  },
  inputLabel: {
    display: "flex",
    color: theme.palette.text.primary,
    fontSize: getRelativeFontSize(6),
    variant: "standard",
    ...boldFont,
    "& .MuiTextField-root": {
      color: "red",
    },
    "& .MuiInputLabel-root ": {
      color: "red",
    },
    "&:focus": {
      color: "red",
    },
    "& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      color: "red",
    },
  },

  emailDropDownStyle: {
    "& .MuiOutlinedInput-root": {
      padding: "0, 9px",
      height: "47px",
      // borderRadius: "12px !important",
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },

  dropDownOptionsStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: "150px",
        Overflow: "auto",
      },
    },
  },
  errorStyle: {
    paddingLeft: "15px",
  },
  auto: {
    fontSize: getRelativeFontSize(9),
    fontColor: theme.palette.common.black,
    variant: "standard",
    ...boldFont,
  },
  mainCardHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(10),
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
  },

  select: {
    "& .MuiOutlinedInput-root": {
      height: "47px",
      borderRadius: "12px",
      fontSize: getRelativeFontSize(),

      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },

  select2: {
    "& .MuiOutlinedInput-root": {
      height: "50px",
      // borderRadius: "12px",
      fontSize: getRelativeFontSize(),

      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },
  BootstrapInput: {
    border: "1px solid",
    borderRadius: "15px",
    ".MuiInputBase-root": {
      borderRadius: "15px",
    },
    "& .MuiInputLabel-root ": {
      color: "red !important",
    },
    "&:focus": {
      color: "red !important",
    },
    "& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      color: "red !important",
    },
  },
  rowColor: {
    ...mediumFont,
    padding: "0",
    wordBreak: "break-all",
    fontSize: "14px",
  },
  BootstrapInputError: {
    border: "1px solid red !Important",
    borderRadius: "15px",
    ".MuiInputBase-root": {
      borderRadius: "15px",
    },
    "& .MuiInputLabel-root ": {
      color: "red !important",
    },
    "&:focus": {
      color: "red !important",
    },
    "& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused": {
      color: "red !important",
    },
  },
  searchInput: {
    width: "100%",
    height: "50px",
  },
  searchBaronClick: {
    border: "1px solid Blue ! Important",
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

  alertCardStyle: {
    width: "100%",
    marginBottom: 2,
    position: "relative",
    borderRadius: "16px",
    display: "flex",
    flexDirection: "column",
  },
} as const;

export default UserAccessStyles;
