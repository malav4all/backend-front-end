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
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    [`@media screen and (max-width: ${1390}px)`]: {
      padding: "10px 30px",
    },
  },
  projectTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(3),
  },
  card: {
    border: "1px solid #F0F0F0",
    borderRadius: "10px",
    boxShadow: 0,
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
