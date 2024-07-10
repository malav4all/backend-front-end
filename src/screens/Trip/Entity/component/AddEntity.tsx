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

const AddEntity = ({
  open,
  handleClose,
  entityFormData,
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

  const addEntityDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Add Entity</Typography>
      </Box>
    );
  };
  
  const addEntityDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Entity Name"
            id="entity_name_field"
            type="text"
            name="name"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box>
              <Box display={"flex"}>
                <Typography sx={classes.label}>Entity Type</Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <Select
                id="role_management_select_permission_dropdown"
                name="permissions"
                sx={classes.dropDownStyle}
                displayEmpty
                value={entityFormData.code.value}
                onChange={handleModuleChange}
                multiple
                MenuProps={MenuProps}
                renderValue={(selected) => (
                  <Typography>
                    {selected.length === 0
                      ? "Select Modules"
                      : selected.join(", ")}
                  </Typography>
                )}
                error={
                  !isTruthy(entityFormData.code?.value) &&
                  entityFormData.code?.error
                }
              >
                {modulesData.map((item: any) => (
                  <MenuItem
                    key={item._id}
                    value={item.name}
                    sx={classes.optionStyle}
                  >
                    <Checkbox
                      checked={entityFormData.code?.value?.includes(item.name)}
                      sx={classes.checkbox}
                    />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {!isTruthy(entityFormData.code?.value) && (
              <FormHelperText error sx={{ paddingLeft: "20px" }}>
                {entityFormData.code?.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Address"
            id="address_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="City"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="State"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Area"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="District"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Pincode"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Contact Name"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Contact Email"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            required
            label="Contact Phone"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            label="GST"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={6}>
          <CustomInput
            label="Aadhar Number"
            id="city_field"
            type="text"
            name="address"
            placeHolder="Enter Entity Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 50 }}
            value={entityFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={entityFormData.name.error}
          />
        </Grid>


      </Grid>
    );
  };

  const addEntityDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_entity_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{
              ...classes.cancelButtonStyle,
              backgroundColor: "#00000000",
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_entity_submit_button"
            label="Add"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addEntityHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add entity not found!" /> */}
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      //   closeButtonVisibility
      handleDialogClose={handleClose}
      dialogHeaderContent={addEntityHeaderImg()}
      dialogTitleContent={addEntityDialogTitle()}
      dialogBodyContent={addEntityDialogBody()}
      dialogFooterContent={addEntityDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddEntity;
