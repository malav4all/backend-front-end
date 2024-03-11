import { Box, Typography } from "@mui/material";
import PageNotFoundStyles from "./PageNotFound.styles";
import PageNotFoundImg from "../../assets/images/PageNotFound.png";

const PageNotFound = () => {
  const classes = PageNotFoundStyles;

  const getBody = () => {
    return (
      <Box sx={classes.mainContainer}>
        <img src={PageNotFoundImg} alt="Page not found image" />
        <Typography sx={classes.fontSize}>Page Not Found</Typography>
      </Box>
    );
  };

  return getBody();
};

export default PageNotFound;
