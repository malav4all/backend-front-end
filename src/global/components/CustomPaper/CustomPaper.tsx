import React from "react";
import customPaperStyles from "./CustomPaper.styles";
import { Paper } from "@mui/material";

interface CustomProps {
  children: React.ReactNode;
  className?: any;
  isWeb?: boolean;
  removeBorder?: boolean;
}

const CustomPaper = (props: CustomProps) => {
  const classes = customPaperStyles;
  if (props.removeBorder) {
    if (!props.isWeb) {
      return (
        <Paper
          variant="outlined"
          sx={[classes.customPaperMobile, props.className]}
        >
          {props.children}
        </Paper>
      );
    }
  }
  return (
    <Paper variant="outlined" sx={[classes.customPaper, props.className]}>
      {props.children}
    </Paper>
  );
};

export default CustomPaper;
