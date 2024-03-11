import { boldFont } from "../../../utils/styles";

const appHeaderStyles = {
  appHeaderTitle: {
    ...boldFont,
  },
  menuMobile: {
    width: "100vw",
  },
} as const;

export default appHeaderStyles;
