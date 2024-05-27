import { BorderBottomOutlined } from "@mui/icons-material";
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

const customTableDashboardStyles = {
  table: {
    borderCollapse: "separate",
    borderSpacing: "0px",
    borderTopRadius: "5px",
    borderBottomRadius: "5px",
    borderColor: "white",
    width: "100%",
    marginTop: "2rem",
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
    backgroundColor: "#F6F9FC",
    borderBottom: "none",
    padding: "12px 24px",
    borderTop: "none",
    textAlign: "left",
    "& .MuiTableSortLabel-icon": {
      display: "none",
    },
  },

  tableCell: {
    ...regularFont,
    fontSize: "14px",
    textAlign: "left",
    backgroundColor: "white",
    borderBottom: "none",
    minWidth: "75px",
    padding: "7px 3px"
  },

  tableRow: {
    backgroundColor: "white",
    borderBottom: "1px"
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
