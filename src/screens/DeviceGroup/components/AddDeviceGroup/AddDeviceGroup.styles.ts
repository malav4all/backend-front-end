import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
} from "../../../../utils/styles";

const addDeviceGroupStyles = {
  boldFonts: {
    ...boldFont,
    fontSize: getRelativeFontSize(13),
    textAlign: "center",
  },
  centerItemFlex: {
    ...centerItemFlex,
  },
  dialogFooter: {
    display: "flex",
    gap: "10px",
    ...centerItemFlex,
    width: "100%",
    margin: "20px",
    justifyContent: "center",
    "& button": {
      width: "120px",
    },
  },
  cancelButtonStyle: {
    color: "#212121 !important",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E7E7E7",
    "&:hover": {
      background: "none",
    },
  },
} as const;

export default addDeviceGroupStyles;
