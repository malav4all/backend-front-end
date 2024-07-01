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

const AddIndustry = ({
  open,
  handleClose,
  industryFormData,
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

  const addIndustryDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          Add Industry
        </Typography>
      </Box>
    );
  };

  const addIndustryDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={6} lg={4}>
          <CustomInput
            required
            label="Industry Name"
            id="profile_name_field"
            type="text"
            name="name"
            placeHolder="Enter Industry Name"
            onChange={onChangeHandler}
            propsToInputElement={{ maxLength: 25 }}
            value={industryFormData.name.value}
            onBlur={checkExitsRoleHandler}
            error={industryFormData.name.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <CustomInput
            required
            label="Industry File"
            id="profile_file_field"
            type="file"
            name="file"
            placeHolder="Choose File"
            onChange={handleFileChange}
          />
        </Grid>

        <Grid item xs={12} sm={6} lg={4}>
          <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
            <Box>
              <Box display={"flex"}>
                <Typography sx={classes.label}>Industry Module</Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <Select
                id="role_management_select_permission_dropdown"
                name="permissions"
                sx={classes.dropDownStyle}
                displayEmpty
                value={industryFormData.code.value}
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
                  !isTruthy(industryFormData.code?.value) &&
                  industryFormData.code?.error
                }
              >
                {modulesData.map((item: any) => (
                  <MenuItem
                    key={item._id}
                    value={item.name}
                    sx={classes.optionStyle}
                  >
                    <Checkbox
                      checked={industryFormData.code?.value?.includes(
                        item.name
                      )}
                      sx={classes.checkbox}
                    />
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            {!isTruthy(industryFormData.code?.value) && (
              <FormHelperText error sx={{ paddingLeft: "20px" }}>
                {industryFormData.code?.error}
              </FormHelperText>
            )}
          </Box>
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
              placeholder="Enter your description"
              value={industryFormData.description.value}
              onChange={onChangeHandler}
            />
          </Box>
        </Grid>
      </Grid>
    );
  };

  const addIndustryDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_industry_cancel_button"
            label="Cancel"
            onClick={handleClose}
            customClasses={{
              ...classes.cancelButtonStyle,
              color: theme.palette.text.primary,
            }}
          />
          <CustomButton
            id="add_industry_submit_button"
            label="Save"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addIndustryHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add industry not found!" /> */}
      </Box>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
    //   closeButtonVisibility
      handleDialogClose={handleClose}
      dialogHeaderContent={addIndustryHeaderImg()}
      dialogTitleContent={addIndustryDialogTitle()}
      dialogBodyContent={addIndustryDialogBody()}
      dialogFooterContent={addIndustryDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddIndustry;
