import { centerItemFlex, regularFont } from "../../../utils/styles";

const CustomAutoCompleteStyles = {
  autoCompleteStylesStyle: {
    width: "100%",
    height: "52px",
    borderRadius: "5px",
    position: "relative",
    background: "#ffffff",
  },

  autocomplete: {
    width: "100%",
    "& .MuiInputBase-input": {
      height: "14px",
      position: "relative",
      padding: "12px 12px",
      "&::placeholder": {
        ...regularFont,
      },
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "5px",
      borderColor: "#DFDFDF",
    },
  },
  birthdayBox: {
    ...centerItemFlex,
    width: "50px",
    height: "50px",
  },
} as const;

export default CustomAutoCompleteStyles;
