import React from "react";
import customPaperStyles from "./CustomAppHeaderStyles";
import { Box } from "@mui/material";

interface CustomProps {
  children: React.ReactNode;
  className?: any;
}

const CustomAppHeader = (props: CustomProps) => {
  const classes = customPaperStyles;

  return (
      <Box sx={[classes.customPaper, props.className]}>{props.children}</Box>
  );
};

export default CustomAppHeader;
