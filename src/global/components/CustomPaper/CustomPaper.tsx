import React from "react";
import customPaperStyles from "./CustomPaper.styles";
import { Paper, SxProps } from "@mui/material";

interface CustomProps {
  children: React.ReactNode;
  className?: any;
  isWeb?: boolean;
  removeBorder?: boolean;
  sx?: SxProps;
}

const CustomPaper = (props: CustomProps) => {
  const classes = customPaperStyles;
  const { children, className, isWeb, removeBorder, sx } = props;
  if (removeBorder) {
    if (!isWeb) {
      return (
        <Paper
          variant="outlined"
          sx={[classes.customPaperMobile, className, sx]}
        >
          {children}
        </Paper>
      );
    }
  }
  return (
    <Paper variant="outlined" sx={[classes.customPaper, className, sx]}>
      {children}
    </Paper>
  );
};

export default CustomPaper;
