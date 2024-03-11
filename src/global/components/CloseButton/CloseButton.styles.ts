import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const closeButtonStyles = makeStyles((theme: Theme) => ({
  closeBtn: {
    position: "fixed",
    top: "10px",
    right: "10px",
    borderRadius: "50%",
    padding: "3px",
    color: "black",
  },
}));

export default closeButtonStyles;
