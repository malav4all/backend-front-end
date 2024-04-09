import {
  boldFont,
  inputLabelRequiredColor,
  mediumFont,
} from "../../../utils/styles";

const customContactNumberStyles = {
  textField: {
    width: "100%",
    borderRadius: "8px",
    "& .MuiInputBase-input": {
      position: "relative",
      padding: "12px 12px",
      backgroundColor: "#fff",
      "&::placeholder": {
        ...mediumFont,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },
  nameField: {
    ...boldFont,
    display: "flex",
    color: "#212121",
    "& .MuiFormLabel-asterisk": {
      color: inputLabelRequiredColor,
    },
  },
} as const;

export default customContactNumberStyles;
