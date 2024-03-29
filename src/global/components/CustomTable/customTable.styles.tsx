import {
  boldFont,
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
    borderSpacing: "0 5px",
    borderTopRadius: "15px",
    borderBottomRadius: "15px",
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
    ...boldFont,
    color: "#FFFFFF",
    backgroundColor: "#4b14c4",
    borderTop: "1px solid #F0F0F0",
    borderBottom: "1px solid #F0F0F0",
    textAlign: "left",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },
  tableCell: {
    ...regularFont,
    fontSize: getRelativeFontSize(2),
    height: "40px",
    borderTop: "1px solid #F0F0F0",
    borderBottom: "1px solid #F0F0F0",
    textAlign: "left",
  },
  tableRow: {
    margin: "10px 0",
    backgroundColor: "#FAFBFD",
    "&:hover": {
      cursor: "pointer",
    },
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
    ...mediumFont,
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
