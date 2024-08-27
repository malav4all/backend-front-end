import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  primaryColorPurple,
  regularFont,
  theme,
} from "../../../../utils/styles";

const viewTripStyle = {
  mainBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "1.6rem",
    marginLeft: "1.6rem",
    width: "95%",
    borderRadius: "5px",
    backgroundColor: "#212139",
    [`@media screen and (max-width: ${1390}px)`]: {
      padding: "10px 30px",
      background: "#212139",
    },
  },
  projectTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(3),
  },
  borderStyles: {
    borderRadius: "5px",
    border: "1px solid",
    borderColor: "rgba(255, 255, 255, 0.12)",
  },
  card: {
    border: "1px solid",
    borderColor: theme.palette.divider,
    borderRadius: "5px",
    backgroundColor: "#060B25",
    padding: 0,
  },
  centerItemFlex: {
    ...centerItemFlex,
  },
  fieldData: {
    ...boldFont,
    fontSize: getRelativeFontSize(),
  },

  fieldText: {
    ...regularFont,
    fontSize: getRelativeFontSize(),
  },
  jobDetailsText: {
    ...boldFont,
    fontSize: getRelativeFontSize(3),
  },
  headingText: {
    fontFamily: "Geist_semibold",
    fontSize: "1.1rem",
    marginBottom: "1.7rem",
    padding: "0.2rem 0.8rem",
    borderRadius: "5px",
    borderLeft: "7px solid",
    borderLeftColor: "#855BDE",
  },
  jobTitleText: {
    ...boldFont,
    color: primaryColorPurple,
    marginTop: theme.spacing(1),
    fontSize: getRelativeFontSize(7),
  },

  subTypeText: {
    ...regularFont,
    marginTop: theme.spacing(1),
  },
  workStatus: {
    ...regularFont,
    display: "flex",
    alignItems: "center",
    color: "#828282",
    marginTop: "5px",
    fontSize: getRelativeFontSize(2),
  },
};

export default viewTripStyle;
