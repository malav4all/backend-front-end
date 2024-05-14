import {
  boldFont,
  borderColor,
  darkPurpledColor,
  getRelativeFontSize,
  lightPinkColor,
  mediumFont,
  pinkDarkColor,
  pinkThemedMenuItems,
  purpleThemedSelectComponent,
  regularFont,
  theme,
} from "../../../utils/styles";

const customTableStyles = {
  table: {
    borderCollapse: "separate",
    borderSpacing: "0px",
    borderTopRadius: "5px",
    borderBottomRadius: "5px",
    borderColor: "white",
    width: "100%",
    mt: 2,
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
    },
  },
  tableBody: {
    maxHeight: "500px",
    overflow: "auto",
  },
  tableHeaderCell: {
    ...mediumFont,
    color: "#FFFFFF",
    backgroundColor: "#5F22E2",
    borderTop: "1px solid #ffffff",
    borderBottom: "1px solid #ffffff",
    padding: "0.8rem",
    textAlign: "left",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  tableCell: {
    ...regularFont,
    fontSize: "12px",
    padding: "0.5rem",
    // borderBottom: "1px solid #F0F0F0",
    textAlign: "left",
  },
  tableRow: {
    margin: "0px 0",
    backgroundColor: "white",
  },

  checkBoxStyle: {
    paddingRight: "50px",
  },
  selectAllCheckbox: {
    color: "#ffffff",
    "&.Mui-checked": {
      color: pinkDarkColor,
    },
  },
  checkbox: {
    "&.Mui-checked": {
      color: pinkDarkColor,
    },
  },
  mediumFonts: {
    ...regularFont,
    fontSize: getRelativeFontSize(5),
  },
  regularFonts: {
    ...regularFont,
    fontSize: getRelativeFontSize(1),
  },
  perPageDropdown: {
    height: "30px",
    borderRadius: "6px",
    cursor: "pointer",
    marginLeft: "5px",
    ...purpleThemedSelectComponent,
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
} as const;

export default customTableStyles;
