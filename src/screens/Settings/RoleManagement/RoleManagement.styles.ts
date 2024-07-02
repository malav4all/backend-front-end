import {
  boldFont,
  buttonWhiteBg,
  centerItemFlex,
  darkPurpledColor,
  getRelativeFontSize,
  headerColor,
  inputLabelRequiredColor,
  mediumFont,
  pinkDarkColor,
  pinkThemedMenuItems,
  primaryBlackColor,
  primaryHeadingColor,
  pureWhiteColor,
  purplePrimaryColor,
  purpleThemedSelectComponent,
  regularFont,
  theme,
} from "../../../utils/styles";

const RoleManagementStyles = {
  predefinedHeader: {
    fontSize: getRelativeFontSize(8),
    ...boldFont,
    color: primaryHeadingColor,
  },
  pageSubtitle: {
    fontSize: getRelativeFontSize(6),
    ...boldFont,
    color: primaryHeadingColor,
  },
  addTagChip: {
    marginLeft: "5px",
    marginTop: "8px",
    borderRadius: "5px",
    ...mediumFont,
    fontSize: "15px",
    fontColor: "white !important",
    backgroundColor: headerColor,
  },
  resourceRowHeader: {
    ...boldFont,
    fontSize: "16px",
  },
  placeholderText: {
    ...regularFont,
    color: "#999999",
  },
  resourceActionButton: {
    background: pureWhiteColor,
    borderRadius: "10px",
    width: "100%",
    height: "45px",
    border: "1px solid #E7E7E7",
    [theme.breakpoints.down("lg")]: {
      border: "none",
    },
  },
  dropDownStyle: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    backgroundColor: pureWhiteColor,
    height: "47px",
    padding: "2px",
    width: "100%",
    borderRadius: "12px",
    fontSize: "16px",
  },
  errorText: {
    color: "#d32f2f",
    paddingLeft: "10px",
  },
  checkbox: {
    "&.MuiCheckbox-colorPrimary": { color: pinkDarkColor },
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  predefinedGridContainer: {
    display: "grid",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    marginTop: "20px",
    gridTemplateColumns: "repeat(4, 1fr)",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.only("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
  },
  predefinedTooltipContent: {
    padding: "10px",
    color: "white",
    fontSize: "14px",
    ...regularFont,
  },
  predefinedGridItem: {
    background: pureWhiteColor,
    margin: 0,
    border: "1px solid #E7E7E7",
    borderRadius: "18px",
    padding: "20px",
    cursor: "pointer",
  },
  predefinedRoleName: {
    fontSize: "20px",
    fontWeight: 600,
    fontStyle: "normal",
    color: primaryBlackColor,
    textTransform: "capitalize",
  },
  predefinedListStyle: {
    listStyleType: "disc",
    padding: "10px 1px 10px 30px",
  },
  predefinedListItem: {
    ...regularFont,
    paddingLeft: "0px",
    fontSize: "16px",
    fontStyle: "normal",
    color: primaryBlackColor,
    textTransform: "capitalize",
    display: "list-item",
    lineHeight: "23px",
    "::marker": {
      color: pinkDarkColor,
    },
  },
  centerItemFlex: {
    ...centerItemFlex,
    paddingBottom: "20px",
  },
  pageFooter: {
    display: "flex",
    gap: "10px",
    ...centerItemFlex,
    width: "100%",
    justifyContent: "center",
    marginTop: "40px",
    "& button": {
      width: "120px",
    },
  },
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#00000000",
    border: "1px solid #E7E7E7",
    "&:hover": {
      background: "none",
    },
  },
  dialogTitleWrapper: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    gap: "10px",
    textAlign: "center",
  },
  titleRight: {
    color: " rgba(0,0,0,.85)",
    ...boldFont,
    fontSize: getRelativeFontSize(14),
  },
  dialogContent: {
    fontSize: getRelativeFontSize(2),
    ...mediumFont,
    textAlign: "center",
    "& span": {
      ...boldFont,
    },
  },
  dialogFooter: {
    width: "100%",
    display: "flex",
    alignItem: "center",
    justifyContent: "center",
    marginBottom: "20px",
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
  campaignPerDefined: {
    display: "grid",
    gridColumnGap: "20px",
    gridRowGap: "20px",
    marginTop: "1px",
    gridTemplateColumns: "repeat(1, 1fr)",
    [theme.breakpoints.only("xs")]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
    [theme.breakpoints.only("sm")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.only("md")]: {
      gridTemplateColumns: "repeat(3, 1fr)",
    },
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
  menuProps: {
    PaperProps: {
      style: {
        maxHeight: "150px",
        Overflow: "auto",
      },
    },
  },
  dropDownOptionsStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
  testAreaStyle: {
    borderColor: "rgba(0,0,0,0.2)",
    background: "none",
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px !important",
    },
  },
} as const;

export default RoleManagementStyles;
