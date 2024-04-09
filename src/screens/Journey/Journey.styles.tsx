import {
  regularFont,
  boldFont,
  theme,
  pureWhiteColor,
  primaryHeadingColor,
  getRelativeFontSize,
  pinkDarkColor,
  mediumFont,
  purpleThemedSelectComponent,
  pinkThemedMenuItems,
  inputLabelRequiredColor,
} from "../../utils/styles";

const journeyStyles = {
  divderResponsive: {
    width: "100px",
    borderColor: "#828282",
    // marginBottom: "66px",
    [theme.breakpoints.down("md")]: {
      width: "0px",
      margin: "0px",
    },
  },

  mainSection: {
    padding: theme.spacing(2),
    paddingTop: "2px",
    marginTop: "10px",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(0),
    },
  },
  mainCard: {
    marginTop: theme.spacing(10),
  },
  inputWrapperAddClasses: {
    marginLeft: "10px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
  },
  headerBackgroundColor: {
    backgroundColor: "#f1edff",
    padding: "10px 20px 15px 18px",
  },
  mainCardHeader: {},
  mainCardHeading: {
    ...boldFont,
    margin: "32px 0 20px 0",
    width: "100%",
    fontSize: getRelativeFontSize(10),
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(5),
      marginBottom: theme.spacing(1),
    },
  },

  mainCardInputsSection: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(1),
    },
  },
  inputSection: {
    display: "flex",
    flexWrap: "wrap",
  },
  inputsSectionDropdowns: {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      gap: "10px",
    },
  },
  dropDownStyle: {
    backgroundColor: pureWhiteColor,
    height: "47px",
    padding: "2px",
    width: "150px",
    borderRadius: "5px",
    [theme.breakpoints.down("lg")]: {
      marginBottom: "5px",
    },
    ...regularFont,
    ...purpleThemedSelectComponent,
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  searchInputWrapper: {
    padding: "0 10px",
    display: "flex",
    alignItem: "center",
    gap: "10px",
    [theme.breakpoints.down("sm")]: {
      gap: "40px",
    },
  },

  searchInput: {
    width: "100%",
    height: "50px",
    border: "1px solid rgba(0,0,0,.5)",
    [theme.breakpoints.down("md")]: {
      width: "50px",
    },
  },
  refreshBtn: {
    height: "47px",
    backgroundColor: "#ffffff",
    border: "1px solid #ced4da",
    minWidth: "50px",
    borderRadius: "5px",
    width: "50px",
    display: "flex",
    alignItems: "center",
    justifyContact: "center",
    fontSize: "50px",
    marginLeft: "10px",
    // marginTop: "8px",
    [theme.breakpoints.down("md")]: {
      marginLeft: "0px",
    },
    "&:hover": {
      backgroundColor: "white",
    },
  },
  rowColor: {
    color: pinkDarkColor,
    ...mediumFont,
    fontSize: "14px",
    padding: " 0",
    display: "flex",
    justifyContent: "flex-start",
  },
  inputLabel: {
    display: "flex",
    color: "#212121",
    fontSize: getRelativeFontSize(7),
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
  star: {
    color: inputLabelRequiredColor,
  },
  emailDropDownStyle: {
    "& .MuiOutlinedInput-root": {
      padding: "0, 9px",
      height: "47px",
      borderRadius: "5px",
      backgroundColor: "white",
      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
    },
  },
  select: {
    "& .MuiOutlinedInput-root": {
      height: "47px",
      borderRadius: "5px",
      fontSize: getRelativeFontSize(),

      "&.Mui-focused fieldset": {
        borderColor: "#4B0150",
      },
      "& .MuiAutocomplete-input  ": {
        padding: "0px",
      },
    },
  },
  errorStyle: {
    marginLeft: "14px",
  },
  liveTrackingTooltipText: {
    padding: "10px",
    color: "white",
    fontSize: "14px",
    ...regularFont,
  },
};

export default journeyStyles;
