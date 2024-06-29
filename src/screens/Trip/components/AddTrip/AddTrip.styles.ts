import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  pinkThemedMenuItems,
  purpleThemedSelectComponent,
  regularFont,
  theme,
} from "../../../../utils/styles";

const addTripStyles = {
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
  dropDownOptionsStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E7E7E7",
    "&:hover": {
      background: "none",
    },
  },
  inputLabel: {
    display: "flex",

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
  errorStyle: {
    paddingLeft: "15px",
  },
  dropDownStyle: {
    borderRadius: "5px",
    ...purpleThemedSelectComponent,
    "& .MuiInputBase-input": {
      borderColor: "#0675f9",
      fontSize: getRelativeFontSize(),
    },
  },
  datePicker: {
    width: "100%",
    "& .MuiInputBase-input": {
      borderRadius: "10px",
      position: "relative",
      padding: "12px 12px",
      "&::placeholder": {
        color: "#9CA3AF",
        opacity: 1,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      borderColor: "#E7E7E7",
      "& .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
        borderColor: "#E7E7E7",
      },
    },
  },
} as const;

export default addTripStyles;
