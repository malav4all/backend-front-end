import { useTheme } from "@mui/material";

const useCustomAppHeaderStyles = () => {
  const theme = useTheme();

  return {
    customPaper: {
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      border: "none",
    },
    customPaperMobile: {
      border: "none",
      // Add any other styles specific to mobile here
    },
  } as const;
};

export default useCustomAppHeaderStyles;
