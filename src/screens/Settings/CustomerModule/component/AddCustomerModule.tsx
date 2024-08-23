import React, { ChangeEvent } from "react";
import { Box, Grid, TextField, Typography, useTheme } from "@mui/material";
import {
  CustomButton,
  CustomInput,
  CustomDialog,
} from "../../../../global/components";

interface CustomerModuleFormData {
  name: { value: string; error: string };
  code: { value: string; error: string };
  description: { value: string; error: string };
}

interface AddCustomerModuleProps {
  open: boolean;
  handleClose: () => void;
  customerModuleFormData: CustomerModuleFormData;
  modulesData: Array<{ name: string; code: string }>; // Adjust type based on actual data structure
  onChangeHandler: (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleModuleChange: (
    event: ChangeEvent<{ name?: string; value: unknown }>
  ) => void;
  checkExitsRoleHandler: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
  isLoading: boolean;
  MenuProps: Record<string, unknown>;
  classes: any;
  edit: boolean;
}

const AddCustomerModule: React.FC<AddCustomerModuleProps> = ({
  open,
  handleClose,
  customerModuleFormData,
  modulesData,
  onChangeHandler,
  handleModuleChange,
  checkExitsRoleHandler,
  handleFileChange,
  handleSave,
  isLoading,
  MenuProps,
  classes,
  edit,
}) => {
  const theme = useTheme();

  const addCustomerModuleDialogTitle = () => (
    <Box>
      <Typography sx={classes.boldFonts}>
        {edit ? "Update Customer Module" : "Add Customer Module"}
      </Typography>
    </Box>
  );

  const addCustomerModuleDialogBody = () => (
    <Grid container spacing={2} sx={{ padding: "1rem" }}>
      <Grid item xs={12} sm={6} lg={6}>
        <CustomInput
          required
          label="Module Name"
          id="module_name_field"
          type="text"
          name="name"
          placeHolder="Enter Module Name"
          onChange={onChangeHandler}
          propsToInputElement={{ maxLength: 25 }}
          value={customerModuleFormData.name.value}
          onBlur={checkExitsRoleHandler}
          error={customerModuleFormData.name.error}
        />
      </Grid>

      <Grid item xs={12} sm={6} lg={6}>
        <CustomInput
          required
          label="Module Code"
          id="module_code_field"
          type="text"
          name="code"
          placeHolder="Enter Module Code"
          onChange={onChangeHandler}
          propsToInputElement={{ maxLength: 25 }}
          value={customerModuleFormData.code.value}
          onBlur={checkExitsRoleHandler}
          error={customerModuleFormData.code.error}
        />
      </Grid>

      <Grid item xs={12} sm={12} lg={12}>
        <Box sx={classes.formInput} display={"flex"} flexDirection={"column"}>
          <Box>
            <Box display={"flex"}>
              <Typography sx={classes.label}>Module Description</Typography>
            </Box>
            <TextField
              multiline
              minRows={3}
              inputProps={{ maxLength: 500 }}
              sx={classes.testAreaStyle}
              name="description"
              id="description"
              placeholder="Enter Module Description"
              value={customerModuleFormData.description.value}
              onChange={onChangeHandler}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );

  const addCustomerModuleDialogFooter = () => (
    <Grid container sx={classes.centerItemFlex}>
      <Box sx={classes.dialogFooter}>
        <CustomButton
          id="add_customer_module_cancel_button"
          label="Cancel"
          onClick={handleClose}
          customClasses={{
            ...classes.cancelButtonStyle,
            backgroundColor: "#00000000",
            color: theme.palette.text.primary,
          }}
        />
        <CustomButton
          id="add_customer_module_submit_button"
          label={edit ? "Update" : "Add"}
          onClick={handleSave}
          loading={isLoading}
        />
      </Box>
    </Grid>
  );

  const addCustomerModuleHeaderImg = () => (
    <Box display={"flex"}>
      {/* <img src={} alt="Add module not found!" /> */}
    </Box>
  );

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      handleDialogClose={handleClose}
      dialogHeaderContent={addCustomerModuleHeaderImg()}
      dialogTitleContent={addCustomerModuleDialogTitle()}
      dialogBodyContent={addCustomerModuleDialogBody()}
      dialogFooterContent={addCustomerModuleDialogFooter()}
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddCustomerModule;
