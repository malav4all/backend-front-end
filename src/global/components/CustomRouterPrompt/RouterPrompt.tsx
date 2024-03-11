import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { CustomDialog } from "..";
import Confirmation from "../../../assets/images/Confirmation.svg";
import { Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface RouterPromptProps {
  when?: Boolean;
  bodyContent?: any;
  footerContent?: JSX.Element;
  titleContent?: JSX.Element;
  closeModal?: any;
  setShowPrompt?: Function;
  showPrompt?: boolean;
  setRouterPromptExitMode?: Function;
}

export const RouterPrompt = (props: RouterPromptProps) => {
  const history = useHistory();
  function handleShowModal() {
    props.setShowPrompt && props.setShowPrompt(true);
  }

  const close = () => {
    props.setShowPrompt && props.setShowPrompt(false);
  };

  useEffect(() => {
    history.block((item): any => {
      if (props.when) {
        const splitArray = item.pathname.split("/");
        props.setRouterPromptExitMode?.(
          "/" + splitArray[splitArray.length - 1]
        );
        handleShowModal();
        return false;
      }
      return true;
    });
  }, [history, props.when]);

  const closeDialog = () => {
    props.closeModal(false);
  };

  const dialogHeaderContent = () => {
    return (
      <>
        <Box display={"flex"}>
          <img src={Confirmation} alt="" />
        </Box>
        <Box
          sx={{ position: "absolute", top: "15px", right: "15px", color: "" }}
        >
          <IconButton aria-label="close" onClick={() => close()}>
            <CloseIcon />
          </IconButton>
        </Box>
      </>
    );
  };

  return props.showPrompt ? (
    <CustomDialog
      dialogHeaderContent={dialogHeaderContent()}
      isDialogOpen={props.showPrompt || false}
      dialogBodyContent={props.bodyContent}
      dialogTitleContent={props.titleContent}
      dialogFooterContent={props.footerContent}
      handleDialogClose={close}
      width="500px"
    />
  ) : null;
};
