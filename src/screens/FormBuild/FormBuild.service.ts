import {
  boldFont,
  inputLabelRequiredColor,
  primaryHeadingColor,
  regularFont,
  semiBoldFont,
  theme,
} from "../../utils/styles";

const formBuilderStyles = {
  mainCardHeading: {
    ...boldFont,
    fontFamily: "Geist_Medium",
    fontSize: "2rem",
    margin: "16px 0 0 0",
    width: "100%",
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
  },

  label: {
    ...semiBoldFont,
    fontSize: "14px",
    marginBottom: "8px",
  },

  star: {
    color: inputLabelRequiredColor,
    ...boldFont,
  },

  dropDownStyle: {
    ...regularFont,
    height: "42px",
    padding: "2px",
    width: "100%",
    borderRadius: "5px",
    fontSize: "16px",
  },

  mainCardHeading1: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: theme.palette.primary.main,
  },
  createFormButton: {
    height: "190px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderStyle: "dashed",
    borderColor: theme.palette.primary.main,
    "&:hover": {
      borderColor: theme.palette.primary.dark,
    },
  },
};

export default formBuilderStyles;
