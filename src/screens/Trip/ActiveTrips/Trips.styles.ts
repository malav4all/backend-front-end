import {
  boldFont,
  mediumFont,
  primaryHeadingColor,
  theme,
} from "../../../utils/styles";

const tripStyles = {
  divderResponsive: {
    width: "100px",
    borderColor: "#828282",
    [theme.breakpoints.down("md")]: {
      width: "0px",
      margin: "0px",
    },
  },

  settingsTitle: {
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    color: "white",
    marginLeft: "-0.7rem",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
  },

  mainSection: {
    padding: "30px",
    paddingTop: "2px",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(0),
    },
  },

  mainCardHeading: {
    ...boldFont,
    fontFamily: "Geist_Medium",
    fontSize: "0.5rem",
    margin: "16px 0 0 0",
    width: "100%",
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
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
  tableWrapper: {
    marginTop: 2,
    overflow: "auto",
    background: "#060B25",
    [`@media screen and (max-width: ${1370}px)`]: {
      marginTop: 0,
    },
    "&::-webkit-scrollbar": {
      width: "10",
      display: "none",
    },
  },
  // headerBox: {
  //   background: "#060B25",
  //   [theme.breakpoints.down("sm")]: {},
  // },
  mainBox: {
    padding: "20px 30px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  outerTabBox: {
    borderBottom: "none",
    marginTop: "10px",
    [`@media screen and (max-width: ${1390}px)`]: {
      marginTop: "0px",
    },
  },
  tripText: {
    ...boldFont,
    [`@media screen and (max-width: ${1390}px)`]: {
      fontSize: "2rem",
    },
  },
  inputWrapper: {
    [theme.breakpoints.down("md")]: {
      marginTop: "8px",
    },
  },
  addBox: {
    background: "#4F31BC",
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    color: "#FFFFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [`@media screen and (max-width: ${1390}px)`]: {
      width: "25px",
      height: "25px",
    },
  },
  titleDeleteStyle: {
    
    textAlign: "center",
  },
};

export default tripStyles;
