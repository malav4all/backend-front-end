import {
  boldFont,
  getRelativeFontSize,
  mediumFont,
  primaryColorBlack,
  theme,
} from "../../../../utils/styles";

const addTripStyles = {
  headerBox: {
    background: "#060B25",
    height: "100vh",
    [theme.breakpoints.down("md")]: {
      height: "100vh",
    },
  },
  mainBox: {
    padding: "15px 30px",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
    [`@media screen and (max-width: ${1390}px)`]: {
      boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.10)",
    },
  },
  consultantText: {
    ...boldFont,
    fontSize: getRelativeFontSize(15),
    [`@media screen and (min-width: ${1390}px)`]: {
      fontSize: getRelativeFontSize(15),
    },
  },
  stepperStyle: {
    overflow: "auto",
    "& .MuiStepLabel-labelContainer": {
      ...mediumFont,
      fontSize: getRelativeFontSize(2),
    },
    "& .MuiStepLabel-label.Mui-completed": {
      color: primaryColorBlack,
      ...boldFont,
      fontSize: getRelativeFontSize(2),
    },
  },
};

export default addTripStyles;
