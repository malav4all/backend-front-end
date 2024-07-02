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
    width: "100%",
    mt: 2,
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
    },
  },

  tableBody: {
    maxHeight: "500px !important",
    maxwidth: "100%",
    overflow: "scroll",
  },

  tableHeaderCell: {
    ...regularFont,
    fontSize: "14px",
    border: "none",
    padding: "12px 18px",
    backgroundColor: "#F5F7F9",
    borderLeft: "none !important",
    borderRight: "none !important",
    textAlign: "left",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },

  tableCell: {
    ...regularFont,
    fontSize: "14px",
    padding: "0.5rem 0.4rem",
    textAlign: "left",
    backgroundColor: "white",
    borderTop: "none !important",
    borderLeft: "none !important",
    borderRight: "none !important",
    borderBottom: "none",
  },

  tableRow: {
    borderLeft: "none",
    borderRight: "none",
    borderBottom: "1px solid !important",
    borderBottomColor: theme.palette.divider + "!important",
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
    fontSize: "13px",
  },
  perPageDropdown: {
    height: "25px",
    borderRadius: "5px",
    cursor: "pointer",
    marginLeft: "5px",
    fontSize: "13px",
    ...purpleThemedSelectComponent,
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
} as const;

export default customTableStyles;
