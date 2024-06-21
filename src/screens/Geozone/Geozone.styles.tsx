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
  semiBoldFont,
} from "../../utils/styles"

const geozoneStyle = {
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
    borderRadius: "5px",
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

  searchStyles: { margin: "5px 5px", width: "95%" },

  inputLabel: {
    display: "flex",
    color: "#212121",
    fontSize: getRelativeFontSize(6),
    fontColor: theme.palette.common.black + " !important",
    variant: "standard",
    ...semiBoldFont,
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

  locationHeading: { ...boldFont, fontSize: "14px", color: "#3C424D" },

  locationDescription: { ...regularFont, fontSize: "13px", color: "#3C424D" },

  star: {
    color: inputLabelRequiredColor,
  },

  emailDropDownStyle: {
    "& .MuiOutlinedInput-root": {
      padding: "0, 9px",
      height: "47px",
      borderRadius: "5px !important",
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
    ...semiBoldFont,
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
      borderRadius: "5px !important",
    },
  },
  errorStyle: {
    marginLeft: "14px",
  },
  mobileNumber: {
    width: "100%",
    "& .MuiInputBase-input": {
      borderRadius: "5px",
      // position: "relative",
      // background: "#ffffff",
      padding: "12px 12px",
      [`@media screen and (max-width: ${1370}px)`]: {
        padding: "10px 12px",
      },
      "&::placeholder": {
        ...regularFont,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
      "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
        borderColor: "dark grey",
      },
    },
  },
} as const
export default geozoneStyle
