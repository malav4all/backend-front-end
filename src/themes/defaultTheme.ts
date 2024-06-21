import { createTheme, ThemeOptions } from "@mui/material/styles";
declare module "@mui/material/styles" {
  interface Palette {
    customAppHeader?: {
      default: string;
      paper: string;
    };
    icon?: {
      main: string;
    };
    tableHeader?: string;
    tableBorder?: string;
    secondaryBackgroundColor?: string;
    dialogColor: {
      body?: string;
      border?: string;
    };
  }
  interface PaletteOptions {
    customAppHeader?: {
      default: string;
      paper: string;
    };
    icon?: {
      main: string;
    };
    tableHeader?: string;
    tableBorder?: string;
    secondaryBackgroundColor?: string;
    dialogColor: {
      body?: string;
      border?: string;
    };
  }
}

const lightColors = {
  primaryTextColor: "#3C424D",
  secondryTextColor: "#A7A7A7",
  tableBorderColor: "#EBE9E8",
  dialogBackgroundColor: "#ffffff",
  dialogBorderColor: "#F0F5F9",
  borderRadius: "5px",
  headerColor: "#B696FA",
  primaryColor: "#0d3057",
  primaryBackgroundColor: "#F0F5F9",
  secondaryBackgroundColor: "#ffffff",
  tableHeader: "#F6F9FC",
  borderColor: "#E9ECEF",
  infoTextColor: "#888888",
  disabledBackgroundColor: "#888888",
  textLightColor: "#666666",
  purplePrimaryColor: "#5F22E2",
  pinkDarkColor: "#fffff0",
  pureWhiteColor: "#ffffff",
  offWhiteColor: "#ffffff",
  primaryHeadingColor: "#001529",
  primaryGreenColor: "#adc804",
  primaryBlue: "#5F22E2",
  lightTextColor: "#666",
  lightPinkColor: "#f1edff",
  activeMenuColor: "#5F22E2",
  darkPurpledColor: "#0675f9",
  inputLabelRequiredColor: "red",
  buttonWhiteBg: "#E7E7E7",
  lightBgColor: "#FAF5FD",
  chipBackgroundColor: "#FFF1F9",
  completeChipBackgroundColor: "#E7EEBD",
  activeMenuBackgroundColor: "#f1edff",
  cardBorderColor: "#f0f5f5",
  warningColor: "red",
  primaryBorderColor: "#E7E7E7",
  primaryPurple: "#5F22E1",
};

const darkColors = {
  primaryTextColor: "#F2F2FF",
  secondryTextColor: "#293159",
  tableBorderColor: "#293159",
  dialogBackgroundColor: "#060B25",
  dialogBorderColor: "#293159",
  borderRadius: "5px",
  headerColor: "#814AF9",
  primaryColor: "#90caf9",
  primaryBackgroundColor: "#060B25",
  secondaryBackgroundColor: "#3e4047",
  tableHeader: "#000000",
  borderColor: "rgba(255, 255, 255, 0.12)",
  infoTextColor: "#BBBBBB",
  disabledBackgroundColor: "#555555",
  textLightColor: "#BBBBBB",
  purplePrimaryColor: "#bb86fc",
  pinkDarkColor: "#fffff0",
  pureWhiteColor: "#ffffff",
  offWhiteColor: "#15152E",
  primaryHeadingColor: "#ffffff",
  primaryGreenColor: "#b9f6ca",
  primaryBlue: "#bb86fc",
  lightTextColor: "#BBBBBB",
  lightPinkColor: "#cf6679",
  activeMenuColor: "#bb86fc",
  darkPurpledColor: "#3700b3",
  inputLabelRequiredColor: "red",
  buttonWhiteBg: "#333333",
  lightBgColor: "#1e1e1e",
  chipBackgroundColor: "#2c2c2c",
  completeChipBackgroundColor: "#37474f",
  activeMenuBackgroundColor: "#2c2c2c",
  cardBorderColor: "#333333",
  warningColor: "red",
  primaryBorderColor: "#333333",
  primaryPurple: "#5F22E1",
};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: lightColors.primaryColor,
    },
    background: {
      default: lightColors.primaryBackgroundColor,
      paper: lightColors.offWhiteColor,
    },
    customAppHeader: {
      default: lightColors.headerColor,
      paper: lightColors.headerColor,
    },
    text: {
      primary: lightColors.primaryTextColor,
      secondary: lightColors.secondryTextColor,
    },
    divider: lightColors.borderColor,
    tableBorder: lightColors.tableBorderColor,
    icon: {
      main: lightColors.primaryPurple,
    },
    tableHeader: lightColors.primaryBackgroundColor,
    secondaryBackgroundColor: lightColors.secondaryBackgroundColor,
    dialogColor: {
      body: lightColors.dialogBackgroundColor,
      border: lightColors.dialogBorderColor,
    },
  },
  typography: {
    allVariants: {
      color: lightColors.primaryTextColor,
    },
  },
} as ThemeOptions);

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkColors.primaryColor,
    },
    background: {
      default: darkColors.primaryBackgroundColor,
      paper: darkColors.offWhiteColor,
    },
    customAppHeader: {
      default: darkColors.headerColor,
      paper: darkColors.headerColor,
    },
    text: {
      primary: darkColors.primaryTextColor,
    },
    divider: darkColors.borderColor,
    tableBorder: lightColors.tableBorderColor,
    icon: {
      main: darkColors.primaryPurple,
    },
    tableHeader: darkColors.primaryBackgroundColor,
    secondaryBackgroundColor: darkColors.secondaryBackgroundColor,
    dialogColor: {
      body: darkColors.dialogBackgroundColor,
      border: darkColors.dialogBorderColor,
    },
  },
  typography: {
    allVariants: {
      color: darkColors.primaryTextColor,
    },
  },
} as ThemeOptions);
