import {
  theme,
  primaryHeadingColor,
  regularFont,
  purpleThemedSelectComponent,
  pureWhiteColor,
  pinkThemedMenuItems,
  headerColor,
} from "../../../../utils/styles";

const routesReportStyles = {
  header: {
    display: "flex",
    alignItems: "center",
    backgroundColor: headerColor,
    padding: "16px 1.7rem",
    paddingBottom: "64px",
    paddingTop: "35px",
  },
  tableWrapper: {
    marginTop: 2,
    overflow: "auto",
    [`@media screen and (max-width: ${1370}px)`]: {
      marginTop: 0,
    },
    "&::-webkit-scrollbar": {
      width: "10",
      display: "none",
    },
  },
  heading: {
    fontFamily: "Geist_Medium",
    color: primaryHeadingColor,
    fontSize: "2rem",
    [theme.breakpoints.down("md")]: {
      marginTop: theme.spacing(1),
    },
  },
  dropDownStyle: {
    ...regularFont,
    ...purpleThemedSelectComponent,
    backgroundColor: pureWhiteColor,
    height: "42px",
    width: " 180px",
    borderRadius: "5px",
    fontSize: "14px",
  },
  optionStyle: {
    ...regularFont,
    ...pinkThemedMenuItems,
  },
};

export default routesReportStyles;
