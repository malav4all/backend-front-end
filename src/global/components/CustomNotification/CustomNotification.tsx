import { Box, Snackbar, Theme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import customNotificationStyles from "./CustomNotification.styles";
import strings from "../../constants/StringConstants";
import { CustomIcon } from "..";
import clsx from "clsx";

interface CustomProps {
  showNotification: boolean;
  verticalPosition: "top" | "bottom";
  horizontalPosition: "left" | "right";
  variant: string;
  title: string;
  message: string;
  icon: JSX.Element;
  handleClose: any;
}

const getStyles = (variant: string) => {
  switch (variant) {
    case strings.info:
      return {
        backgroundColor: "#1e95d6",
        color: "white !important",
      };
    case strings.success:
      return {
        backgroundColor: "#22BF4F",
        color: "white !important",
      };
    case strings.warning:
      return {
        backgroundColor: "#f68a1c",
        color: "black !important",
      };
    case strings.error:
      return {
        backgroundColor: "#F23C3C",
        color: "white !important",
      };
    default:
      break;
  }
};

const CustomNotification = (props: CustomProps) => {
  const classes = customNotificationStyles();

  const customClassesStyle = makeStyles((theme: Theme) => ({
    notificationBlock: {
      ...getStyles(props.variant),
      width: "350px",
      padding: "5px",
      display: "flex",
      borderRadius: "10px",
      marginTop: "2.1rem",
      zIndex: "10000000000000000000000000"
    },
  }));

  const customClasses = customClassesStyle();
  return (
    <Snackbar
      open={props.showNotification}
      anchorOrigin={{
        vertical: props.verticalPosition,
        horizontal: props.horizontalPosition,
      }}
      autoHideDuration={strings.autoHideDuration}
      onClose={props.handleClose}
    >
      <Box className={customClasses.notificationBlock}>
        <Box p={1} className={classes.iconBlock}>
          {props.icon}
        </Box>
        <Box
          p={1}
          className={clsx(classes.iconBlock, classes.messageContainer)}
        >
          <Box>
            <Box className={classes.notificationTitle}>{props.title}</Box>
            <Box className={classes.messageBox}>{props.message}</Box>
          </Box>
        </Box>
        <Box
          p={1}
          className={clsx(classes.closeNotification, classes.iconBlock)}
          onClick={props.handleClose}
        >
          <CustomIcon icon={<Close fontSize="small" />} />
        </Box>
      </Box>
    </Snackbar>
  );
};

export default CustomNotification;
