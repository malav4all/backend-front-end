import React from "react";
import {
  Box,
  Checkbox,
  Grid,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CustomButton,
  CustomInput,
  CustomDialog,
} from "../../../../global/components";
import { isTruthy } from "../../../../helpers/methods";

const AddTripType = ({
  open,
  handleClose,
  tripTypeFormData,
  modulesData,
  onChangeHandler,
  handleModuleChange,
  checkExitsRoleHandler,
  handleFileChange,
  handleSave,
  isLoading,
  MenuProps,
  classes,
}: any) => {
  const theme = useTheme();

  const addTripTypeDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          Add TripType
        </Typography>
      </Box>
    );
  };

  const addTripTypeDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Trip Name"
            id="trip_name_field"
            type="text"
            name="name"
            placeHolder="Enter Trip Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Min Battery Percentage"
            id="trip_name_field"
            type="number"
            name="name"
            placeHolder="Enter Minimun Battery Percentage"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Trip Rate"
            id="trip_name_field"
            type="number"
            name="name"
            placeHolder="Enter Trip Rate"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="GST Percentage"
            id="trip_name_field"
            type="text"
            name="name"
            placeHolder="Enter GST Percentage"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Disabled Field"
            id="trip_name_field"
            type="text"
            name="name"
            placeHolder="Enter Entity Type Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={12} lg={6}>
          <CustomInput
            required
            label="Filtration Field"
            id="trip_name_field"
            type="text"
            name="name"
            placeHolder="Enter Entity Type Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={tripTypeFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={tripTypeFormData.name.error}
          />
        </Grid>
      </Grid>
    );
  };

  const addTripTypeDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_tripType_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_tripType_submit_button"
            label="Add"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addTripTypeHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add tripType not found!" /> */}
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
    //   closeButtonVisibility
      handleDialogClose={handleClose}
      dialogHeaderContent={addTripTypeHeaderImg()}
      dialogTitleContent={addTripTypeDialogTitle()}
      dialogBodyContent={addTripTypeDialogBody()}
      dialogFooterContent={addTripTypeDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddTripType;
