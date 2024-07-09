import React from "react";
import {
  Box,
  Grid,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import {
  CustomButton,
  CustomInput,
  CustomDialog,
} from "../../../../global/components";

const AddUserAccess = ({
  open,
  handleClose,
  userAccessFormData,
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

  const addUserAccessDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          Add UserAccess
        </Typography>
      </Box>
    );
  };

  const addUserAccessDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} lg={12}>
          <CustomInput
            required
            label="UserAccess Name"
            id="profile_name_field"
            type="text"
            name="name"
            placeHolder="Enter Entity Type Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={userAccessFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={userAccessFormData.name.error}
          />
        </Grid>

        <Grid item xs={12}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box display={"flex"}>
              <Typography sx={classes.label}>Description </Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <TextField
              multiline
              minRows={3}
              inputProps={{ maxLength: 500 }}
              sx={classes.testAreaStyle}
              name="description"
              id="comment"
              placeholder="Enter Description"
              value={userAccessFormData.description.value}
              onChange={onChangeHandler}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  const addUserAccessDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_userAccess_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_userAccess_submit_button"
            label="Add"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addUserAccessHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add userAccess not found!" /> */}
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
    //   closeButtonVisibility
      handleDialogClose={handleClose}
      dialogHeaderContent={addUserAccessHeaderImg()}
      dialogTitleContent={addUserAccessDialogTitle()}
      dialogBodyContent={addUserAccessDialogBody()}
      dialogFooterContent={addUserAccessDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddUserAccess;
