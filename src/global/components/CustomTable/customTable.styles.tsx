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
    bakgroundColor: "red",
    width: "100%",
    mt: 2,
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
    },
  },

  tableBody: {
    maxHeight: "500px",
    maxwidth: "100%",
  },

  tableHeaderCell: {
    ...mediumFont,
    color: "#3C424D",
    backgroundColor: "#F5F7F9",
    borderBottom: "none",
    borderTop: "none",
    textAlign: "left",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },

  tableCell: {
    ...regularFont,
    fontSize: "12px",
    padding: "0.5rem 1rem",
    textAlign: "left",
    backgroundColor: "white",
     borderBottom: "none",
  },

  tableRow: {
    backgroundColor: "white",
  },

  checkBoxStyle: {
    paddingRight: "50px",
  },
  selectAllCheckbox: {
    color: "white",
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
