import { BorderBottomOutlined, BorderTop } from "@mui/icons-material";
import {
  boldFont,
  borderColor,
  darkPurpledColor,
  getRelativeFontSize,
  lightFont,
  lightPinkColor,
  mediumFont,
  pinkDarkColor,
  pinkThemedMenuItems,
  purpleThemedSelectComponent,
  regularFont,
  theme,
} from "../../../utils/styles";

const customTableDashboardStyles = {
  table: {
    borderCollapse: "separate",
    borderSpacing: "0px",
    borderTopRadius: "5px",
    borderBottomRadius: "5px",
    borderTop: "none",
    width: "100%",
    marginTop: "2rem",
    [theme.breakpoints.down("xl")]: {
      overflow: "auto",
    },
  },

  tableBody: {
    maxHeight: "500px",
    overflowY: "scroll",
    maxwidth: "100%",
    borderTop: "none",
  },

  tableHeaderCell: {
    ...regularFont,
    fontSize: '14px',
    border: "none",
    padding: "12px 18px",
    textAlign: "left",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },

  tableCell: {
    ...regularFont,
    border: "none",
    fontSize: "14px",
    textAlign: "left",
    backgroundColor: "white",
    minWidth: "110px",
    padding: "7px 3px",
  },

  tableRow: {
    borderLeft: "none",
    borderRight: "none",
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

export default customTableDashboardStyles;
