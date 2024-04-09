import {
  boldFont,
  getRelativeFontSize,
  pinkThemedMenuItems,
  primaryHeadingColor,
  pureWhiteColor,
  purpleThemedSelectComponent,
  regularFont,
  theme,
} from "../../../../utils/styles";

export const alertReportStyles = {
  mainCardHeading: {
    ...boldFont,
    fontSize: getRelativeFontSize(10),
    color: primaryHeadingColor,
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(3),
    },
  },
  campaignerTable: {
    minWidth: "300px",
    width: "100%",
    overflow: "auto",
  },
  dropdown: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    height: "40px",
    width: "200px",
    backgroundColor: pureWhiteColor,
    borderRadius: "8px",
    color: "#22222C",
    border: 0,
    boxShadow: "4px 4px 30px rgba(0, 0, 0, 0.03)",
    "&:hover": {
      border: 0,
    },
  },
  dropdownOptions: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
};
