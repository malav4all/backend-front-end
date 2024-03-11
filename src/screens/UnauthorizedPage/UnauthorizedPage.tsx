import { Box, Typography } from "@mui/material";
import UnauthorizedPageStyles from "./UnauthorizedPage.styles";
import UnauthorizedImg from "../../assets/images/contactDeleteIconImg.svg";

interface CustomProps {
  pageName?: string;
}

const UnauthorizedPage = (props: CustomProps) => {
  const classes = UnauthorizedPageStyles;

  const getBody = () => {
    return (
      <Box sx={classes.mainContainer}>
        <img
          style={{ width: "250px" }}
          src={UnauthorizedImg}
          alt="Unauthorized image"
        />
        <Typography sx={classes.fontSize} mt={4}>
          You don't have permission to view {props.pageName} page. Please
          contact your account administrator.
        </Typography>
      </Box>
    );
  };

  return getBody();
};

export default UnauthorizedPage;
