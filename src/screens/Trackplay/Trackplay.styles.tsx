import {
  getRelativeFontSize,
  primaryHeadingColor,
  theme,
  centerItemFlex,
  boldFont,
  inputLabelRequiredColor,
  purpleThemedSelectComponent,
  regularFont,
  pinkThemedMenuItems,
  headerColor,
} from "../../utils/styles";

const trackplayStyle = {
  mainCardHeading: {
    fontWeight: "bold",
    fontSize: getRelativeFontSize(10),
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
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
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: headerColor,
    padding: "16px",
    paddingBottom: "64px",
    paddingTop: "35px",
  },
  boldFonts: {
    ...boldFont,
    fontSize: getRelativeFontSize(13),
    textAlign: "center",
  },
  centerItemFlex: {
    ...centerItemFlex,
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
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E7E7E7",
    "&:hover": {
      background: "none",
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
        borderColor: "#4B0150",
      },
    },
  },

  activeButton: {
    backgroundColor: "green",
    color: "white",
    border: "1px solid green",
  },

  nonActiveButton: {
    backgroundColor: "gray",
    color: "black",
    border: "1px solid gray",
  },

  select: {
    "& .MuiOutlinedInput-root": {
      height: "47px",
      borderRadius: "12px",
      fontSize: getRelativeFontSize(),

      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },
  label: {
    ...boldFont,
    marginBottom: "8px",
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "10px",
    },
  },
  testAreaStyle: {
    borderColor: "rgba(0,0,0,0.2)",
    width: "100%",
    background: "none",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
    },
  },
  errorStyle: {
    marginLeft: "14px",
  },
} as const;
export default trackplayStyle;
