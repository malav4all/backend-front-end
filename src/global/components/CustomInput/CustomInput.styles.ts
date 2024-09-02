import {
  borderColor,
  inputLabelRequiredColor,
  regularFont,
  semiBoldFont,
} from "../../../utils/styles";

const customInputStyles = {
  textField: {
    width: "100%",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "10px 12px",
      backgroundColor: "#060b25",
      "&::placeholder": {
        ...regularFont,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },
  nameField: {
    ...semiBoldFont,
    fontSize: "14px",
    color: "#465465",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
} as const;

export default customInputStyles;
