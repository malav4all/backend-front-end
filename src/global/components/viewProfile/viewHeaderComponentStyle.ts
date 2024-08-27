import {
  boldFont,
  centerItemFlex,
  getRelativeFontSize,
  primaryColorBlack,
  primaryColorPurple,
  theme,
} from "../../../utils/styles";

const viewHeaderComponentStyle = {
  headerBox: {
    background: "#060B25",
    boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.05)",
  },
  mainBox: {
    // padding: "20px 10px",
    display: "flex",
    justifyContent: "space-between",
    alignContent: "center",
  },
  avatar: {},
  consultantText: {
    ...boldFont,
    fontSize: getRelativeFontSize(12),
  },
  contactInfo: {
    [theme.breakpoints.down("md")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },

  contactInfoSubSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  softSagesLogo: {
    ...centerItemFlex,
    marginRight: theme.spacing(1),
  },
  connecterBox: {
    width: "4px",
    height: "4px",
    borderRadius: "10px",
    backgroundColor: primaryColorBlack,
  },
  viewHeaderLeft: {
    [theme.breakpoints.down("md")]: {
      paddingLeft: "5px",
    },
    [theme.breakpoints.down("sm")]: {
      marginTop: "10px",
    },
  },
  outerBox: {
    ...centerItemFlex,
    background: primaryColorPurple,
    borderRadius: "10px",
    p: "3px",
    height: "40px",
    padding: "5px",
  },
  btnBox: {
    color: "white",
    textTransform: "none",
    justifyContent: "space-between",
  },
  addBox: {
    ...centerItemFlex,
    background: "#4F31BC",
    width: "32px",
    height: "32px",
    borderRadius: "10px",
    color: "#FFFFF",
  },
  editBtn: {
    p: "6px",
    height: "40px",
    //     width: "32px",
    width: "auto",
    border: "1px solid #E7E7E7",
    borderRadius: "10px",
  },
  infoWrapper: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    alignItems: "flex-start",
    justifyContent: "start",
  },
  infoItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginLeft: "0 !important",
    wordBreak: "break-all",
  },
  avatarStyle: {
    width: "56px",
    height: "56px",
    [`@media screen and (max-width: ${1370}px)`]: {
      width: "45px",
      height: "45px",
    },
  },
  refreshButton: {
    minWidth: "150px",
    borderRadius: "none",
    outline: "none",
    border: "none",
    background: "none",
    ...boldFont,
    color: "#24CBC7",
    ":hover": {
      background: "none",
    },
  },
};

export default viewHeaderComponentStyle;