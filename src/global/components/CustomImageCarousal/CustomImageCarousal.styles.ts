import { lightTextColor, pureWhiteColor } from "../../../utils/styles";

const customImageCarousalStyles = {
  mainContainerBox: {
    "& img": {
      width: "100%",
      height: "100%",
    },
  },
  arrowIconBox: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "30px",
    width: "30px",
    margin: "0px 5px",
    borderRadius: "100%",
    filter: `drop-shadow(0px 0px 5px ${lightTextColor})`,
    backgroundColor: pureWhiteColor,
    top: "50%",
  },
  arrowIcons: {
    cursor: "pointer",
    fontSize: "25px",
  },
} as const;

export default customImageCarousalStyles;
