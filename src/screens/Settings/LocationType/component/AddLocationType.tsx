import React from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../global/components";

interface AddLocationTypeModalProps {
  open: boolean;
  handleClose: () => void;
  formField: any;
  onChangeHandler: (event: React.ChangeEvent<any>) => void;
  handleSave: () => void;
  isLoading: boolean;
  classes: any;
}

const AddLocationTypeModal: React.FC<AddLocationTypeModalProps> = ({
  open,
  handleClose,
  formField,
  onChangeHandler,
  handleSave,
  isLoading,
  classes,
}) => {
  const theme = useTheme();

  const addLocationTypeDialogTitle = () => {
    return (
      <Box>
        <Typography
          sx={{
            ...classes.boldFonts,
            textAlign: "center",
            fontSize: "27px",
            fontWeight: "bold",
          }}
        >
          Add Location Type
        </Typography>
      </Box>
    );
  };

  const addLocationTypeDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12}>
          <CustomInput
            required
            label="Location Type"
            id="location_type_field"
            type="text"
            name="type"
            placeHolder="Enter Location Type"
            onChange={onChangeHandler}
            value={formField.value}
            error={formField.error}
          />
        </Grid>
      </Grid>
    );
  };

  const addLocationTypeDialogFooter = () => {
    return (
      <Grid container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            padding: "1rem 0",
            gap: 1,
          }}
        >
          <CustomButton
            id="add_location_type_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{ ...classes.cancelButtonStyle }}
          />
          <CustomButton
            id="add_location_type_submit_button"
            label="Add"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      handleDialogClose={handleClose}
      dialogTitleContent={addLocationTypeDialogTitle()}
      dialogBodyContent={addLocationTypeDialogBody()}
      dialogFooterContent={addLocationTypeDialogFooter()}
      width={"500px"}
      fullScreen={false}
    />
  );
};

export default AddLocationTypeModal;
