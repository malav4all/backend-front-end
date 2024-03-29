import {
  boldFont,
  getRelativeFontSize,
  mediumFont,
} from "../../../utils/styles";

const customTableStyles = {
  table: {
    borderCollapse: "separate",
    borderSpacing: "0 6px",
    overflowX: "auto",

    // minWidth: 1000,
  },
  tableBody: {
    backgroundColor: "#FFFFFF",
    // backgroundColor: contrastBackgroundColor,
    // maxHeight: "500px",
    overflowX: "auto",
  },
  tableHeaderCell: {
    ...boldFont,
    color: "#ffffff",
    backgroundColor: "#4b14c4",
    "&:first-child": {
      borderRadius: "10px 0px 0px 10px",
    },
    "&:last-child": {
      borderRadius: "0px 10px 10px 0px",
    },
    // maxWidth: 300,
  },
  tableCell: {
    borderBottom: "none",
    borderRight: "1px solid  #E5E5E5",
  },
  tableRow: {
    // margin: "10px 0",
    //borderRadius: "15px",
    "&:hover": {
      // backgroundColor: "rgba(237,237,237,0.7)",
      cursor: "pointer",
      // backgroundColor: contrastBackgroundColor,
    },
  },
  mediumFonts: {
    ...mediumFont,
    fontSize: getRelativeFontSize(5),
  },
} as const;

export default customTableStyles;
