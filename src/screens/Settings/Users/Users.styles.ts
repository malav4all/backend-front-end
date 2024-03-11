import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  mainContainer,
  theme,
  primaryHeadingColor,
  pinkDarkColor,
  mediumFont,
  regularFont,
  inputLabelRequiredColor,
  pinkThemedMenuItems,
  purpleThemedSelectComponent,
} from "../../../utils/styles";

const usersStyles = {
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
  headerBackgroundColor: {
    backgroundColor: "#ECF9FF",
    padding: "35px 0px 25px 20px",
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
  centerItemFlex: {
    ...centerItemFlex,
  },
  form: {
    centerItemFlex,
    marginBottom: "10px",
    variant: "standard",
    ...boldFont,
  },
  inputLabel: {
    display: "flex",
    color: "#212121",
    fontSize: getRelativeFontSize(7),
    fontColor: theme.palette.common.black + " !important",
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
  star: {
    color: inputLabelRequiredColor,
  },
  emailDropDownStyle: {
    "& .MuiOutlinedInput-root": {
      padding: "0, 9px",
      height: "47px",
      borderRadius: "12px !important",
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },
  dropDownStyle: {
    height: "47px",
    borderRadius: "12px",
    ...purpleThemedSelectComponent,

    "& .MuiInputBase-input": {
      borderColor: "#0675f9",
      fontSize: getRelativeFontSize(),
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
    color: pinkDarkColor,
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
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E7E7E7",
    "&:hover": {
      background: "none",
    },
  },
} as const;

export default usersStyles;
