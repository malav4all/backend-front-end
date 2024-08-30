import { makeStyles } from "@mui/styles";
import {
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
} from "../../../../../utils/styles";
import { Theme } from "@mui/material/styles";

const TripStyles = makeStyles((theme: Theme) => ({
  boldFonts: {
    fontWeight: 600,
    fontSize: "1.5rem",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: theme.spacing(2),
  },
  centerItemFlex: {
    display: "flex",
    justifyContent: "center",
  },
  dialogFooter: {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    width: "100%",
    margin: "20px 0",
  },
  dropDownOptionsStyle: {
    color: theme.palette.text.primary,
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
    fontSize: "18px",
    color: theme.palette.text.primary,
    fontWeight: 600,
  },
  star: {
    color: theme.palette.error.main,
  },
  errorStyle: {
    paddingLeft: "15px",
  },
  dropDownStyle: {
    borderRadius: "5px",
    height: "45px",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    "& .MuiSelect-select": {
      color: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.divider,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.primary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.primary.main,
      },
    },
  },
  datePicker: {
    width: "100%",
    "& .MuiInputBase-input": {
      borderRadius: "10px",
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
  inputLabelStyle: {
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
  starColor: {
    color: inputLabelRequiredColor,
  },
  customDropZone: {
    borderRadius: "10px",
    background: theme.palette.background.paper,
    border: "1px dashed #E7E7E7",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "30px",
      borderBottom: "1px dashed #E7E7E7",
      borderRight: "1px dashed #E7E7E7",
      borderLeft: "1px dashed #E7E7E7",
      borderTop: "none",
    },
    "& .MuiDropzoneArea-textContainer": {
      width: "100%",
      display: "flex",
      flexDirection: "column-reverse",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px 0",
      [theme.breakpoints.down("md")]: {
        padding: "10px 0",
      },
      [`@media screen and (max-width: ${1370}px)`]: {
        padding: "17px 0",
      },
    },
    "& .MuiDropzoneArea-icon": {
      width: "35px",
      height: "35px",
    },
    "& .MuiTypography-root": {
      fontSize: "0.875rem",
      overflowWrap: "break-word",
      width: "50%",
      textAlign: "center",
      marginLeft: "25%",
      color: "#828282",
    },
    "& .MuiDropzoneArea-text": {
      color: "#828282",
      // ...regularFont,
      margin: "10px auto",
      width: "100%",
      [theme.breakpoints.down("md")]: {
        margin: "2px auto",
      },
    },
    "& .MuiSvgIcon-root": {
      display: "none",
    },
  },
}));

export default TripStyles;
