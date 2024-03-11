import { Theme } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  boldFont,
  getRelativeFontSize,
  regularFont,
} from "../../../utils/styles";

const customNotificationStyles = makeStyles((theme: Theme) => ({
  iconBlock: {
    height: "100%",
    width: "10%",
    display: "flex",
    alignItems: "flex-start",
  },
  notificationTitle: {
    ...boldFont,
    fontSize: getRelativeFontSize(4),
  },
  messageBox: {
    ...regularFont,
    paddingTop: "5px",
    fontSize: getRelativeFontSize(1),
    wordBreak: "break-word",
  },
  messageContainer: {
    width: "80%",
  },
  closeNotification: {
    cursor: "pointer",
    // float: "right",
  },
}));

export default customNotificationStyles;
