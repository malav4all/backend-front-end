import {
  centerItemFlex,
  getRelativeFontSize,
  mainContainer,
  mediumFont,
} from "../../../utils/styles";

const appFooterStyles = {
  footer: {
    ...centerItemFlex,
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerTypo: {
    ...mediumFont,
    fontSize: getRelativeFontSize(),
  },
} as const;

export default appFooterStyles;
