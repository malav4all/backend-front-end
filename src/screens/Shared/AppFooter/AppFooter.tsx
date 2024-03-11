import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import appFooterStyles from "./AppFooter.styles";
import { useMediaQuery } from "@mui/material";
import { theme } from "../../../utils/styles";

const AppFooter = () => {
  const classes = appFooterStyles;
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <Box sx={classes.footer}>
      {isDesktop && (
        <Typography sx={classes.footerTypo}>
          &copy; {getYear()} SoftSages Technology. All Rights Reserved
        </Typography>
      )}
    </Box>
  );
};

export default AppFooter;
