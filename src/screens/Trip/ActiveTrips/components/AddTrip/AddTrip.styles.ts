import { makeStyles } from "@mui/styles";
import { Theme } from "@mui/material/styles";

const TripStyles = makeStyles((theme: Theme) => ({
  boldFonts: {
    fontWeight: 600,
    fontSize: "1.5rem",
    textAlign: "center",
  },
  centerItemFlex: {
    display: "flex",
    justifyContent: "center",
  },
  dialogFooter: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    width: "100%",
    margin: "20px",
    "& button": {
      width: "120px",
    },
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
}));

export default TripStyles;
