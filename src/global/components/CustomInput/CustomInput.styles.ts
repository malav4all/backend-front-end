import {
  boldFont,
  inputLabelRequiredColor,
  mediumFont,
  pureWhiteColor,
} from "../../../utils/styles";

const customInputStyles = {
  textField: {
    width: "100%",
    borderRadius: "5px",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      backgroundColor: "#fff",
      "&::placeholder": {
        ...mediumFont,
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
    ...boldFont,
    color: "#212121",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
} as const;

export default customInputStyles;
