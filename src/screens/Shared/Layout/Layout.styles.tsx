import {
  boldFont,
  getRelativeFontSize,
  inputLabelRequiredColor,
  mediumFont,
  pinkThemedMenuItems,
  primaryBackgroundColor,
  purplePrimaryColor,
  purpleThemedSelectComponent,
  regularFont,
  theme,
  warningColor,
} from "../../../utils/styles";

const layoutStyles = {
  content: {
    width: "100%",
    height: "100vh",
    overflowX: "auto",
    backgroundColor: primaryBackgroundColor,
    position: "relative",
  },
  navbarPosition: {
    position: "absolute",
    top: 0,
    zIndex: "9999999999999",
    width: "100%",
  },
  root: {
    display: "flex",
  },
  dropZoneWrapper: {
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "70px",
      fontSize: "12px",
      borderRadius: "10px",
      borderWidth: "3px",
    },
    "& .MuiDropzoneArea-textContainer": {
      display: "flex",
      flexDirection: "row-reverse",
      justifyContent: "center",
      alignItems: "center",
    },
    "& .MuiDropzoneArea-text": {
      fontSize: getRelativeFontSize(2),
      ...mediumFont,
    },
  },
  warningContent: {
    color: warningColor,
    fontSize: getRelativeFontSize(),
    margin: "10px 0",
    ...mediumFont,
  },
  supportTicket: {
    position: "absolute",
    right: "25px",
    bottom: "0px",
    cursor: "pointer",
  },
  supportTicket1: {
    position: "absolute",
    right: "0px",
    bottom: "100px",
    cursor: "pointer",
    [theme.breakpoints.down("sm")]: {
      bottom: "100px",
    },
  },
  supportTicketClose: {
    position: "absolute",
    right: "10px",
    zIndex: "1",
  },
  supportTicketIcon: {
    position: "relative",
  },
  supportTicketTitleWrapper: {
    width: "100%",
    background: "#f1edff",
    display: "flex",
    justifyContent: "center",
    "& img": {
      [theme.breakpoints.down("lg")]: {
        width: "50%",
      },
    },
  },
  supportTicketTitle: {
    textAlign: "center",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
  formInput: {
    width: "100%",
    "& .MuiDropzoneArea-root": {
      width: "100%",
      minHeight: "10px",
    },
  },
  helpDeskContent: {
    ...regularFont,
    position: "absolute",
    transformOrigin: "0 0",
    transform: "rotate(-90deg)",
    backgroundColor: purplePrimaryColor,
    borderRadius: "16px 16px 0px 0px",
    right: "-39px",
    left: "-21px",
    letterSpacing: "4px",
    padding: "10px 16px 11px 25px",
    fontSize: getRelativeFontSize(),
    width: "100px",
    color: "white",
    fontWeight: "200",
    [theme.breakpoints.down("sm")]: {
      letterSpacing: "4px",
      padding: "7px 0px 8px 16px",
      width: "130px",
      fontWeight: "100",
    },
  },
  label: {
    ...boldFont,
    marginBottom: "8px",
  },
  star: {
    color: inputLabelRequiredColor,
    ...boldFont,
  },
  selectStyle: {
    width: "100%",
    height: "45px",
    borderRadius: "10px",
    ...mediumFont,
    ...purpleThemedSelectComponent,
    "&.Mui-focused fieldset": {
      borderColor: "#0675f9 !important",
    },
  },
  optionStyle: {
    ...mediumFont,
    ...pinkThemedMenuItems,
  },
  testAreaStyle: {
    borderColor: "rgba(0,0,0,0.2)",
    background: "none",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
    },
  },
  testAreaStyleError: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
      borderColor: "red !important",
    },
  },
  submitButton: {
    width: "200px",
    margin: "20px 0",
  },
  previewChip: {
    marginTop: 1,
    padding: "15px 0px",
    justifyContent: "space-between",
  },
  errorStyle: {
    paddingLeft: "15px",
  },
  closeIcon: {
    position: "absolute",
    right: "7px",
    zIndex: "1",
    cursor: "pointer",
    borderRadius: "20px",
  },
} as const;

export default layoutStyles;
