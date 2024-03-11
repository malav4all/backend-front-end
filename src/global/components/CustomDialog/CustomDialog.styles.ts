import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";

const customDialogStyles = makeStyles((theme: Theme) => ({
  headerStyle: {
    background: "#ECF9FF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px 0 0 0",
    position: "relative",
    width: "100%",
  },
  dialogTitle: {
    margin: 0,
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  closeButtonContainer: {
    position: "absolute",
    top: "15px",
    right: "15px",
    color: theme.palette.grey[500],
  },
  closeButton: {
    padding: 0,
    marginTop: "9px",
    marginRight: "5px",
    color: "#212121",
  },
  dialogContent: {
    padding: theme.spacing(2),
  },
  dialogActions: {
    margin: 0,
    padding: theme.spacing(1, 2),
    display: "flex",
  },
  displayFlex: {
    display: "flex",
  },
}));

export default customDialogStyles;
