import { Theme } from "@emotion/react";
import {
  boldFont,
  buttonWhiteBg,
  centerItemFlex,
  getRelativeFontSize,
  inputLabelRequiredColor,
  leftItemFlex,
  mainContainer,
  mainFlexContainer,
  mediumFont,
  pinkThemedMenuItems,
  purplePrimaryColor,
  purpleThemedSelectComponent,
  regularFont,
  theme,
} from "../../../utils/styles";

const uploadGroupStyles = {
  mainSection: {
    ...mainContainer,
    ...mainFlexContainer,
    marginTop: theme.spacing(7),
  },
  mainSectionBody: {
    ...mainContainer,
    marginTop: theme.spacing(1),
  },
  header: {
    position: "sticky",
    marginBottom: 1,
    display: "flex",
  },
  dropZoneHeader: {
    marginBottom: 2,
    display: "flex",
    height: "5px !important",
    flexDirection: "column",
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

    "& .MuiDropzoneArea-icon": {
      [theme.breakpoints.down("sm")]: {
        marginLeft: "15px",
      },
    },

    "& .MuiDropzoneArea-text": {
      fontSize: getRelativeFontSize(2),
      ...mediumFont,
      [theme.breakpoints.down("sm")]: {
        margin: "15px",
      },
    },
  },
  previewChip: {
    minWidth: 160,
    maxWidth: 160,
    marginTop: 1,
    marginBottom: 15,
    padding: "15px",
    display: "flex",
    justifyContent: "left",
  },
  mainHeader: {
    marginBottom: 1,
    display: "flex",
    justifyContent: "center",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
  body: {
    height: "85vh",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  star: {
    color: inputLabelRequiredColor,
    marginLeft: "5px",
  },
  loader: {
    ...centerItemFlex,
    marginLeft: theme.spacing(8),
    [theme.breakpoints.down("sm")]: {
      marginLeft: theme.spacing(0),
    },
  },
  footerWrapper: {
    width: "100%",
    marginBottom: "20px",
    ...centerItemFlex,
    gap: "10px",
    "& button": {
      width: "120px",
    },
  },

  buttonWhiteBg: {
    background: "none",
    border: "1px solid",
    borderColor: buttonWhiteBg,
    color: purplePrimaryColor,
    "&:hover": {
      background: "none",
    },
  },

  leftItemFlex: {
    ...leftItemFlex,
  },
  form: {
    centerItemFlex,
    marginBottom: "25px",
    variant: "standard",
    ...boldFont,
  },
  input: {
    fontSize: getRelativeFontSize(7),
    fontColor: theme.palette.common.black,
    ...boldFont,
    marginTop: "10px",
    display: "flex",
    "& .star": {
      color: inputLabelRequiredColor,
    },
  },
  auto: {
    marginBottom: "10px",
    fontSize: getRelativeFontSize(9),
    fontColor: theme.palette.common.black,
    variant: "standard",
    ...boldFont,
  },
  selectError: {
    border: "1px solid red ",
    width: "100%",
  },
  selectMenu: {
    width: "100%",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },
  select: {
    width: "100%",
    ".MuiOutlinedInput-root": {
      borderRadius: "20px",
    },
    ".MuiInputLabel-root": {
      borderRadius: "20px",
      border: "1px solid black",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#0675f9",
      },
    },
  },
  dropZone: { backgroundColor: "red", width: "50%" },
  dropdown: {
    marginTop: "22px",
    height: 45,
    width: 300,
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    color: "#22222C",
    border: 0,
    boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.03)",
    "&:hover": {
      border: 0,
    },
    [theme.breakpoints.down("sm")]: {
      width: "45vw",
    },
  },
  groupTypeSelect: {
    paddingLeft: "10px",
  },
  errorStyle: {
    paddingLeft: "10px",
  },
  groupTypeStyle: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    borderRadius: "12px",
    height: "47px",
  },
  groupTypeOptions: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  primaryBtn: {
    width: "100%",
    borderRadius: "15px",
    border: "none",
    fontSize: getRelativeFontSize(),
    textAlign: "center",
    backgroundColor: purplePrimaryColor,
    padding: "10px 15px",
    // boxShadow: " 4px 4px 30px rgba(0, 0, 0, 0.03)",
    boxShadow: "0 2px 0 rgb(0 0 0 / 2%)",
    color: "#FFFFFF",
    cursor: "pointer",
    textTransform: "none",
    height: "47px",
    transition: "all .3s ease",
    "&:hover": {
      background: "#059df5",
    },
  },
} as const;

export default uploadGroupStyles;
