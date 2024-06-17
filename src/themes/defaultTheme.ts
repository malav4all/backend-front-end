import { createTheme, ThemeOptions } from "@mui/material/styles";

// Extend the MUI Theme interface to include custom properties
declare module '@mui/material/styles' {
  interface Palette {
    customAppHeader?: {
      default: string;
      paper: string;
    };
    icon?: {
      main: string;
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
  }
}

const lightColors = {
  borderRadius: '5px',
  headerColor: '#D1BBFF',
  primaryColor: '#0d3057',
  primaryBackgroundColor: '#F0F5F9',
  borderColor: '#F1F3F4',
  infoTextColor: '#888888',
  disabledBackgroundColor: '#888888',
  textLightColor: '#666666',
  purplePrimaryColor: '#5F22E2',
  pinkDarkColor: '#fffff0',
  pureWhiteColor: '#ffffff',
  offWhiteColor: '#ffffff',
  primaryHeadingColor: '#001529',
  primaryGreenColor: '#adc804',
  primaryBlackColor: '#3C424D',
  primaryBlue: '#5F22E2',
  lightTextColor: '#666',
  lightPinkColor: '#f1edff',
  activeMenuColor: '#5F22E2',
  darkPurpledColor: '#0675f9',
  inputLabelRequiredColor: 'red',
  buttonWhiteBg: '#E7E7E7',
  lightBgColor: '#FAF5FD',
  chipBackgroundColor: '#FFF1F9',
  completeChipBackgroundColor: '#E7EEBD',
  activeMenuBackgroundColor: '#f1edff',
  cardBorderColor: '#f0f5f5',
  warningColor: 'red',
  primaryBorderColor: '#E7E7E7',
  primaryPurple: "#5F22E1"
};

const darkColors = {
  borderRadius: '5px',
  headerColor: '#D1BBFF',
  primaryColor: '#90caf9',
  primaryBackgroundColor: '#060B25',
  borderColor: 'rgba(255, 255, 255, 0.12)',
  infoTextColor: '#BBBBBB',
  disabledBackgroundColor: '#555555',
  textLightColor: '#BBBBBB',
  purplePrimaryColor: '#bb86fc',
  pinkDarkColor: '#fffff0',
  pureWhiteColor: '#ffffff',
  offWhiteColor: '#191C24',
  primaryHeadingColor: '#ffffff',
  primaryGreenColor: '#b9f6ca',
  primaryBlackColor: '#ffffff',
  primaryBlue: '#bb86fc',
  lightTextColor: '#BBBBBB',
  lightPinkColor: '#cf6679',
  activeMenuColor: '#bb86fc',
  darkPurpledColor: '#3700b3',
  inputLabelRequiredColor: 'red',
  buttonWhiteBg: '#333333',
  lightBgColor: '#1e1e1e',
  chipBackgroundColor: '#2c2c2c',
  completeChipBackgroundColor: '#37474f',
  activeMenuBackgroundColor: '#2c2c2c',
  cardBorderColor: '#333333',
  warningColor: 'red',
  primaryBorderColor: '#333333',
  primaryPurple: "#5F22E1"
};

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
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
      primary: lightColors.primaryBlackColor,
    },
    divider: lightColors.borderColor,
    icon: {
      main: lightColors.primaryPurple,
    }
  },
  typography: {
    allVariants: {
      color: lightColors.primaryBlackColor,
    },
  },
} as ThemeOptions);

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
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
      primary: darkColors.primaryBlackColor,
    },
    divider: darkColors.borderColor,
    icon: {
      main: darkColors.primaryPurple,
    }
  },
  typography: {
    allVariants: {
      color: darkColors.primaryBlackColor,
    },
  },
} as ThemeOptions);
