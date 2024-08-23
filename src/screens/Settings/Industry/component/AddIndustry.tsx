import { ChangeEvent } from "react";
import {
  Box,
  Checkbox,
  Grid,
  FormHelperText,
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

interface IndustryFormData {
  name: { value: string; error: string };
  code: { value: string; error: string };
  description: { value: string; error: string };
  id?: { value: string; error: string };
}

interface ModuleData {
  name: string;
  code: string;
}

interface AddIndustryProps {
  open: boolean;
  handleClose: () => void;
  industryFormData: IndustryFormData;
  modulesData: ModuleData[];
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  handleModuleChange: any;
  checkExitsRoleHandler: () => void;
  handleSave: () => void;
  isLoading: boolean;
  MenuProps: Record<string, unknown>;
  classes: any;
  edit: boolean;
}

const AddIndustry: React.FC<AddIndustryProps> = ({
  open,
  handleClose,
  industryFormData,
  modulesData,
  onChangeHandler,
  handleModuleChange,
  checkExitsRoleHandler,
  handleSave,
  isLoading,
  MenuProps,
  classes,
  edit,
}) => {
  const theme = useTheme();

  const renderDialogTitle = () => (
    <Box>
      <Typography sx={classes.boldFonts}>
        {edit ? "Update Industry" : "Add Industry"}
      </Typography>
    </Box>
  );

  const renderDialogBody = () => (
    <Grid container spacing={2} sx={{ padding: "1rem" }}>
      <Grid item xs={12}>
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

      <Grid item xs={12}>
        <Box sx={classes.formInput} display="flex" flexDirection="column">
          <Box>
            <Box display="flex">
              <Typography sx={classes.label}>Industry Module</Typography>
              <Typography sx={classes.star}>*</Typography>
            </Box>
            <Select
              id="role_management_select_permission_dropdown"
              name="permissions"
              sx={classes.dropDownStyle}
              displayEmpty
              value={industryFormData.code.value}
              onChange={(e) => handleModuleChange(e)}
              multiple
              MenuProps={MenuProps}
              renderValue={(selected) =>
                Array.isArray(selected) && selected.length > 0 ? (
                  <Typography>{selected.join(", ")}</Typography>
                ) : (
                  "Select Modules"
                )
              }
              error={
                !isTruthy(industryFormData.code.value) &&
                Boolean(industryFormData.code.error)
              }
            >
              {modulesData.map((item, index) => (
                <MenuItem
                  key={index}
                  value={item.name}
                  sx={classes.optionStyle}
                >
                  <Checkbox
                    checked={industryFormData.code.value.includes(item.name)}
                    sx={classes.checkbox}
                  />
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </Box>
          {!isTruthy(industryFormData.code.value) && (
            <FormHelperText error sx={{ paddingLeft: "20px" }}>
              {industryFormData.code.error}
            </FormHelperText>
          )}
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Box sx={classes.formInput} display="flex" flexDirection="column">
          <Box display="flex">
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

  const renderDialogFooter = () => (
    <Grid container sx={classes.centerItemFlex}>
      <Box sx={classes.dialogFooter}>
        <CustomButton
          id="add_industry_cancel_button"
          label="Cancel"
          onClick={handleClose}
          customClasses={{
            ...classes.cancelButtonStyle,
            backgroundColor: "#00000000",
            color: theme.palette.text.primary,
          }}
        />
        <CustomButton
          id="add_industry_submit_button"
          label={edit ? "Update" : "Add"}
          onClick={handleSave}
          loading={isLoading}
        />
      </Box>
    </Grid>
  );

  const renderHeaderImg = () => (
    <Box display="flex">
      {/* <img src={} alt="Add industry not found!" /> */}
    </Box>
  );

  return (
    <CustomDialog
      isDialogOpen={open}
      handleDialogClose={handleClose}
      dialogHeaderContent={renderHeaderImg()}
      dialogTitleContent={renderDialogTitle()}
      dialogBodyContent={renderDialogBody()}
      dialogFooterContent={renderDialogFooter()}
      width="700px"
      fullScreen={false}
    />
  );
};

export default AddIndustry;
