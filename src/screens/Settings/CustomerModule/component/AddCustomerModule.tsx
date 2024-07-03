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

interface AddCustomerModuleProps {
  open: boolean;
  handleClose: () => void;
  customerModuleFormData: any;
  modulesData: Array<any>; 
  onChangeHandler: (event: React.ChangeEvent<any>) => void;
  handleModuleChange: (event: any) => void;
  checkExitsRoleHandler: () => void;
  handleFileChange: (event: React.ChangeEvent<any>) => void;
  handleSave: () => void;
  isLoading: boolean;
  MenuProps: any; 
  classes: any; 
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
}) => {
  const theme = useTheme();

  const addCustomerModuleDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Add Customer Module</Typography>
      </Box>
    );
  };

  const addCustomerModuleDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={6} lg={6 }>
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
                <Typography sx={classes.star}>*</Typography>
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
            {!isTruthy(customerModuleFormData.description?.value) && (
              <FormHelperText error sx={{ paddingLeft: "20px" }}>
                {customerModuleFormData.description?.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  };

  const addCustomerModuleDialogFooter = () => {
    return (
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
            label="Save"
            onClick={handleSave}
            loading={isLoading}
          />
        </Box>
      </Grid>
    );
  };

  const addCustomerModuleHeaderImg = () => {
    return (
      <Box display={"flex"}>
        {/* <img src={} alt="Add module not found!" /> */}
      </Box>
    );
  };

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
