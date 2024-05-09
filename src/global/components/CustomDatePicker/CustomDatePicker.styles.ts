import {
    boldFont,
    inputLabelRequiredColor,
    primaryBorderColor,
    pureWhiteColor,
    theme,
  } from "../../../utils/styles";
  
  const customDatePickerStyle = {
    datePickerAdditionalInfo: {
      "& .MuiInputBase-input": {
        position: "relative",
        cursor: "pointer",
        padding: "13px",
      },
    },
    star: {
      color: inputLabelRequiredColor,
      ...boldFont,
      fontSize: "12px",
      marginLeft: "3px",
    },
    errorDatePicker: {
      "& .MuiInputBase-input": {
        position: "relative",
        cursor: "pointer",
        borderRadius: "10px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: primaryBorderColor,
        },
      },
      "& .MuiOutlinedInput-root": {
        padding: "10px",
      },
    },
    inputLabel: {
      display: "flex",
      color: "rgba(0, 0, 0, 0.87)",
      marginLeft: "6px",
      fontSize: "1rem",
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
    inputLabel1: {
      display: "flex",
      color: "#ffffff",
      marginLeft: "6px",
      fontSize: "1rem",
      fontColor: theme.palette.common.white + " !important",
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
  
    datePicker1: {
      "& .MuiInputBase-input": {
        borderTopLeftRadius: "34px",
        borderBottomLeftRadius: "34px",
        position: "relative",
        padding: "10px",
        color: pureWhiteColor,
        fontFamily: "Verdana",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: { xl: "15px", xs: "14px" },
        lineHeight: "23px",
      },
      svg: { color: "#7A81FD", fontSize: { xl: "25px", xs: "20px" } },
      "& .MuiOutlinedInput-root": {
        borderTopLeftRadius: "34px",
        borderBottomLeftRadius: "34px",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          borderColor: "none",
        },
      },
    },
  
    datePicker1Light: {
      "& .MuiInputBase-input": {
        borderTopLeftRadius: "34px",
        borderBottomLeftRadius: "34px",
        position: "relative",
        padding: "10px",
        color: "black",
        fontFamily: "Verdana",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: { xl: "16px", xs: "14px" },
        lineHeight: "23px",
      },
      svg: { color: "#7A81FD", fontSize: { xl: "25px", xs: "20px" } },
      "& .MuiOutlinedInput-root": {
        borderTopLeftRadius: "34px",
        borderBottomLeftRadius: "34px",
        "& .MuiOutlinedInput-notchedOutline": {
          border: "none",
          borderColor: "none",
        },
      },
    },
  
    datePicker2: {
      "& .MuiInputBase-input": {
        borderTopRightRadius: "34px",
        borderBottomRightRadius: "34px",
        position: "relative",
        paddingY: "10px",
        color: pureWhiteColor,
        fontFamily: "Verdana",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: { xl: "15px", xs: "14px" },
        lineHeight: "23px",
      },
      svg: { color: "#7A81FD", fontSize: { xl: "25px", xs: "20px" } },
      "& .MuiOutlinedInput-root": {
        borderTopRightRadius: "34px",
        borderBottomRightRadius: "34px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "none",
          border: "none",
        },
      },
    },
    datePicker2Light: {
      "& .MuiInputBase-input": {
        borderTopRightRadius: "34px",
        borderBottomRightRadius: "34px",
        position: "relative",
        padding: "10px",
        color: "black",
        fontFamily: "Verdana",
        fontStyle: "normal",
        fontWeight: 400,
        fontSize: { xl: "16px", xs: "14px" },
        lineHeight: "23px",
      },
      svg: { color: "#7A81FD", fontSize: { xl: "25px", xs: "20px" } },
      "& .MuiOutlinedInput-root": {
        borderTopRightRadius: "34px",
        borderBottomRightRadius: "34px",
        "& .MuiOutlinedInput-notchedOutline": {
          borderColor: "none",
          border: "none",
        },
      },
    },
    nameStyle: {
      color: "red",
    },
    datePickerOuterBox: {
      border: "1px solid",
      borderRadius: "8px",
      "& .MuiFormControl-root": {
        justifyContent: "end",
      },
    },
  };
  
  export default customDatePickerStyle;
  