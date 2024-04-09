import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const customDrawerStyles = makeStyles(
  (theme: Theme) => ({
    drawerStyle: {
      width: "600px",
      [theme.breakpoints.down("sm")]: {
        width: "380px",
      },
      [theme.breakpoints.down(370)]: {
        width: "100%",
      },
    },
  }),
  { index: 100}
);

export default customDrawerStyles;
