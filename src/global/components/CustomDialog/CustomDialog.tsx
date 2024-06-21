import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Theme,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";
import customDialogStyles from "./CustomDialog.styles";
import { borderRadius } from "../../../utils/styles";
import clsx from "clsx";

interface CustomProps {
  handleDialogClose?: any;
  closable?: boolean;
  width?: string;
  isDialogOpen: boolean;
  dialogTitleContent?: JSX.Element;
  dialogBodyContent: JSX.Element;
  dialogFooterContent?: JSX.Element;
  dialogFooterClass?: any;
  closeButtonVisibility?: boolean;
  fullScreen?: boolean;
  borderRadius?: string;
  dialogHeaderContent?: JSX.Element;
}

const CustomDialog = (props: CustomProps) => {
  const classes = customDialogStyles();
  const width = props.width ? props.width : "60%";
  const radius = props.borderRadius ? props.borderRadius : borderRadius;

  const customStyles = makeStyles((theme: Theme) => ({
    dialogWidth: {
      width: width,
      maxWidth: "none",
      borderRadius: radius,
      background: theme.palette.dialogColor.body,
      border: "3px solid",
      borderColor: theme.palette.dialogColor.border,
    },
  }));
  const customClasses = customStyles();

  const getDialogHeader = () => {
    return (
      props.dialogHeaderContent !== undefined && (
        <Box className={classes.headerStyle}>
          {props?.dialogHeaderContent !== undefined && (
            <Box>{props?.dialogHeaderContent}</Box>
          )}
          {props.closable && props.handleDialogClose !== undefined && (
            <Box
              className={classes.closeButtonContainer}
              onClick={props.handleDialogClose}
            >
              {props.closeButtonVisibility ? (
                <IconButton aria-label="close" className={classes.closeButton}>
                  <CloseIcon />
                </IconButton>
              ) : null}
            </Box>
          )}
        </Box>
      )
    );
  };

  const getDialogTitle = () => {
    return (
      props.dialogTitleContent !== undefined && (
        <DialogTitle
          id="customized-dialog-title"
          className={classes.dialogTitle}
        >
          <Box className={classes.displayFlex}>
            {props.dialogTitleContent !== undefined && (
              <Box style={{ width: "100%" }}>{props.dialogTitleContent}</Box>
            )}
          </Box>
        </DialogTitle>
      )
    );
  };

  const getDialogBody = () => {
    return (
      <DialogContent className={classes.dialogContent}>
        {props.dialogBodyContent}
      </DialogContent>
    );
  };

  const getDialogFooter = () => {
    return (
      props.dialogFooterContent !== undefined && (
        <DialogActions
          className={
            props.dialogFooterClass !== undefined
              ? clsx(classes.dialogActions, props.dialogFooterClass)
              : classes.dialogActions
          }
        >
          {props.dialogFooterContent}
        </DialogActions>
      )
    );
  };

  return (
    <Dialog
      fullScreen={props.fullScreen}
      onClose={props.handleDialogClose}
      aria-labelledby="customized-dialog-title"
      open={props.isDialogOpen}
      classes={{
        paper: customClasses.dialogWidth,
      }}
    >
      {getDialogHeader()}
      {getDialogTitle()}
      {getDialogBody()}
      {getDialogFooter()}
    </Dialog>
  );
};

export default CustomDialog;
