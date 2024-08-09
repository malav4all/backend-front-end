import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../global/components";
import LocationTypeStyles from "../../Settings/LocationType/LocationType.styles";

interface DeviceNameModalProps {
  open: boolean;
  handleClose: () => void;
  formField: any;
  onChangeHandler: (event: React.ChangeEvent<any>) => void;
  handleSave: () => void;
  isLoading?: boolean;
}

const DeviceNameModal: React.FC<DeviceNameModalProps> = ({
  open,
  handleClose,
  formField,
  onChangeHandler,
  handleSave,
  isLoading,
}) => {
  const classes = LocationTypeStyles;
  const deviceNameDialogTitle = () => {
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
          Add Device Name
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
            label="Device Name"
            id="location_type_field"
            type="text"
            name="type"
            placeHolder="Enter Device Name"
            onChange={onChangeHandler}
            value={formField}
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
      dialogTitleContent={deviceNameDialogTitle()}
      dialogBodyContent={addLocationTypeDialogBody()}
      dialogFooterContent={addLocationTypeDialogFooter()}
      width={"500px"}
      fullScreen={false}
    />
  );
};

export default DeviceNameModal;
