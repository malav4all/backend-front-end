import { CustomButton } from "../../../../global/components";
import RoleManagementStyles from "../RoleManagement.styles";
import { Box } from "@mui/material";
import CustomDialog from "../../../../global/components/CustomDialog/CustomDialog";
import DeleteImg from "../../../../assets/images/DeleteImg.svg";

interface customProps {
  handleModalClose: Function;
  openModal: boolean;
  handleConfirmDelete: Function;
  role: string;
}

export const DeleteRoleConfirmModal = (props: customProps) => {
  const classes = RoleManagementStyles;

  const handleCloseModel = () => {
    props.handleModalClose(false);
  };

  const dialogTitleContent = () => {
    return (
      <Box sx={classes.dialogTitleWrapper}>
        <Box sx={classes.titleRight}>Delete Role?</Box>
      </Box>
    );
  };

  const dialogBody = () => (
    <Box sx={classes.dialogContent}>
      Are you sure you want to delete <br />
      <Box component={"span"}>{`${props.role} `}</Box>
      role?
    </Box>
  );

  const dialogContent = () => {
    return (
      <Box sx={classes.dialogFooter}>
        <CustomButton
          label="Cancel"
          customClasses={classes.buttonWhiteBg}
          onClick={() => handleCloseModel()}
          id="role_management_delete_model_cancel"
        />
        <CustomButton
          label="Delete"
          onClick={() => props.handleConfirmDelete()}
          id="role_management_delete_model_delete_button"
        />
      </Box>
    );
  };

  const dialogHeaderContent = () => {
    return (
      <Box display={"flex"}>
        <img src={DeleteImg} alt="delete Image" />
      </Box>
    );
  };

  return (
    <CustomDialog
      dialogHeaderContent={dialogHeaderContent()}
      isDialogOpen={props.openModal}
      closable
      closeButtonVisibility
      handleDialogClose={handleCloseModel}
      dialogTitleContent={dialogTitleContent()}
      dialogBodyContent={dialogBody()}
      dialogFooterContent={dialogContent()}
      width="450px"
    />
  );
};
