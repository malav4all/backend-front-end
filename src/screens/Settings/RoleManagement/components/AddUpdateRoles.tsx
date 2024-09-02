import React, { useEffect } from "react";
import {
  Box,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
  useTheme,
  Checkbox,
} from "@mui/material";
import {
  CustomButton,
  CustomInput,
  CustomDialog,
} from "../../../../global/components";
import {
  createRoleFormData,
  roleFormValidation,
  getResourceObj,
} from "../RoleManagementHelpers";
import RoleManagementStyles from "../RoleManagement.styles";
import {
  addRole,
  updateRole,
  checkExitsRole,
} from "../service/RoleManagement.service";
import {
  openErrorNotification,
  openSuccessNotification,
  isTruthy,
} from "../../../../helpers/methods";
import DeleteIcon from "@mui/icons-material/Delete";

interface AddUpdateRolesProps {
  open: boolean;
  handleClose: () => void;
  name: string;
  rowData: any;
  fetchRolesHandler: any;
  setButtonClick: any;
  resources: any;
  industryType: any;
}

const AddUpdateRoles: React.FC<AddUpdateRolesProps> = ({
  open,
  handleClose,
  name,
  rowData,
  fetchRolesHandler,
  setButtonClick,
  resources,
  industryType,
}) => {
  const theme = useTheme();
  const classes = RoleManagementStyles;
  const edit = name === "Edit";
  const [roleFormData, setRoleFormData] = React.useState(
    createRoleFormData(rowData, edit)
  );
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setRoleFormData(createRoleFormData(rowData, edit));
  }, [rowData, edit]);

  const handleValidation = (isAddResourceValidation: boolean = false) => {
    const { isValid, errors } = roleFormValidation(
      roleFormData,
      isAddResourceValidation
    );
    setRoleFormData(errors);
    return isValid;
  };

  const addRoleHandler = async () => {
    try {
      if (handleValidation()) {
        setLoading(true);
        const body = {
          name: roleFormData.name.value,
          industryType: roleFormData.industryType.value,
          description: roleFormData.description.value,
          resources: roleFormData.resources.map((resource: any) => ({
            name: resource.name.value,
            permissions: resource.permissions.value,
          })),
        };
        if (edit) {
          await updateRole({ input: { ...body, _id: rowData._id } });
          openSuccessNotification(`${body.name} role has been updated`);
        } else {
          await addRole({ input: body });
          openSuccessNotification("New Role has been added successfully");
        }
        setButtonClick("Roles Table");
        await fetchRolesHandler();
        handleClose();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : "An error occurred"
      );
    }
  };

  const handleRoleNameChange = (e: any) => {
    if (!/^[a-zA-Z ]*$/.test(e.target.value)) {
      setRoleFormData({
        ...roleFormData,
        name: {
          ...roleFormData.name,
          error: "Special characters or digits are not allowed.",
        },
      });
      return;
    }
    setRoleFormData({
      ...roleFormData,
      name: {
        value: e.target.value,
        error: "",
      },
    });
  };

  const handleIndustryTypeChange = (e: any) => {
    setRoleFormData({
      ...roleFormData,
      industryType: {
        value: e.target.value,
        error: "",
      },
    });
  };

  const handleDescriptionChange = (e: any) => {
    setRoleFormData({
      ...roleFormData,
      description: {
        value: e.target.value,
        error: "",
      },
    });
  };

  const handleResourceTypeChange = (e: any, resourceIndex: number) => {
    let tempRoleForm = { ...roleFormData };
    tempRoleForm.resources[resourceIndex].name.value = e.target.value;
    tempRoleForm.resources[resourceIndex].permissions.value = [];
    tempRoleForm.resources[resourceIndex].name.error = "";
    setRoleFormData(tempRoleForm);
  };

  const handleResourcePermissionChange = (e: any, resourceIndex: number) => {
    let tempRoleForm = { ...roleFormData };
    tempRoleForm.resources[resourceIndex].permissions.value = e.target.value;
    tempRoleForm.resources[resourceIndex].permissions.error = "";
    setRoleFormData(tempRoleForm);
  };

  const deleteRoleHandler = (index: number) => {
    let tempRoleForm = { ...roleFormData };
    if (roleFormData.resources.length > 1) {
      tempRoleForm.resources.splice(index, 1);
    } else {
      tempRoleForm.resources = [
        {
          name: {
            value: "",
            error: "",
          },
          permissions: {
            value: [],
            error: "",
          },
          path: {
            value: "",
            error: "",
          },
        },
      ];
    }
    setRoleFormData(tempRoleForm);
  };

  const handleAdd = () => {
    handleValidation(true) &&
      setRoleFormData({
        ...roleFormData,
        resources: [...roleFormData.resources, getResourceObj()],
      });
  };

  const getRoleForm = () => {
    return (
      <>
        <CustomInput
          id="role_management_role_name"
          type="text"
          label="Enter Role Name"
          placeHolder="Enter Role Name"
          name="roleName"
          required
          value={roleFormData?.name.value}
          onChange={handleRoleNameChange}
          onBlur={checkExitsRole}
          error={roleFormData?.name.error}
        />
        <Box mt={2}>
          <Stack direction="column">
            <InputLabel
              sx={{
                ...classes.inputLabel,
                color: theme.palette.text.primary,
              }}
              shrink
            >
              Industry Type
              <Box ml={0.4} sx={classes.star}>
                *
              </Box>
            </InputLabel>
            <Select
              sx={classes.dropDownStyle}
              id="add_user_roles_dropdown"
              name="industryType"
              value={roleFormData?.industryType?.value}
              onChange={handleIndustryTypeChange}
              renderValue={
                roleFormData?.industryType?.value !== ""
                  ? undefined
                  : () => "Select a Industry Type"
              }
              displayEmpty
              error={
                roleFormData.industryType.value?.length < 4 &&
                roleFormData.industryType.error?.length !== 0
              }
            >
              {industryType?.map((item: any, index: number) => (
                <MenuItem
                  key={index}
                  value={item._id}
                  sx={classes.dropDownOptionsStyle}
                >
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
        <Box
          sx={classes.inputLabel}
          display={"flex"}
          flexDirection={"column"}
          mt={2}
        >
          <Box display={"flex"}>
            <Typography
              sx={{
                ...classes.inputLabel,
                fontSize: "14px",
                color: theme.palette.text.primary,
              }}
            >
              Description{" "}
            </Typography>
            <Typography sx={classes.star}>*</Typography>
          </Box>
          <TextField
            multiline
            minRows={3}
            inputProps={{ maxLength: 500 }}
            sx={classes.testAreaStyle}
            name="description"
            id="comment"
            placeholder="Enter your comment"
            value={roleFormData.description.value}
            onChange={handleDescriptionChange}
          />
        </Box>
        <Grid container mt={3} alignItems="center">
          <Grid item xs={12} sm={5.5}>
            <Typography mb={1} sx={classes.resourceRowHeader}>
              Resources
            </Typography>
          </Grid>
          <Grid item xs={12} sm={5.5}>
            <Typography mb={1} ml={1} sx={classes.resourceRowHeader}>
              Permission
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {getResourcesXPermission()}
        </Grid>
      </>
    );
  };

  const getResourcesXPermission = () => {
    const allResourcesSelected =
      resources.length === roleFormData?.resources.length;
    return (
      <>
        {roleFormData?.resources?.map((item: any, resourceIndex: any) => {
          const availableResources = industryType?.find(
            (res: any) => res._id === roleFormData.industryType.value
          )?.code;

          const finalResource = availableResources?.filter(
            (res: any) =>
              !roleFormData.resources.some(
                (resourceName: any) =>
                  resourceName.name.value === res &&
                  resourceName.name.value !== item.name.value
              )
          );

          return (
            <>
              <Grid item xs={12} sm={5.5}>
                <Select
                  id="role_management_select_resource_dropdown"
                  name="name"
                  sx={classes.dropDownStyle}
                  error={item.name.error}
                  value={item.name.value}
                  onChange={(e: any) =>
                    handleResourceTypeChange(e, resourceIndex)
                  }
                  displayEmpty
                  renderValue={
                    item?.name.value
                      ? undefined
                      : () => (
                          <Typography sx={classes.placeholderText}>
                            Select Resources
                          </Typography>
                        )
                  }
                >
                  {finalResource?.map((resource: any) => (
                    <MenuItem
                      key={resource}
                      value={resource}
                      sx={classes.dropDownOptionsStyle}
                    >
                      {resource}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={classes.errorText}>
                  {item.name.error}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={5.5}>
                <Select
                  id="role_management_select_permission_dropdown"
                  name="permissions"
                  sx={classes.dropDownStyle}
                  value={item.permissions.value}
                  error={item.permissions.error}
                  multiple
                  onChange={(e: any) =>
                    handleResourcePermissionChange(e, resourceIndex)
                  }
                  displayEmpty
                  renderValue={() =>
                    item?.permissions?.value.join(", ") || (
                      <Typography sx={classes.placeholderText}>
                        Select Permission
                      </Typography>
                    )
                  }
                >
                  {["Add", "Update", "delete", "fetch", "upload"].map(
                    (permission: any) => (
                      <MenuItem
                        key={permission}
                        value={permission}
                        sx={classes.optionStyle}
                      >
                        <Checkbox
                          checked={item?.permissions?.value.includes(
                            permission
                          )}
                          sx={classes.checkbox}
                          id="role_management_checkbox"
                        />
                        <ListItemText primary={permission} />
                      </MenuItem>
                    )
                  )}
                </Select>
                <FormHelperText sx={classes.errorText}>
                  {item.permissions.error}
                </FormHelperText>
              </Grid>
              <Grid item xs={12} sm={1} display="flex" justifyContent="center">
                {resourceIndex > 0 && (
                  <IconButton
                    onClick={() => deleteRoleHandler(resourceIndex)}
                    aria-label="delete"
                  >
                    <DeleteIcon />
                  </IconButton>
                )}
              </Grid>
            </>
          );
        })}
        {!allResourcesSelected && (
          <Grid item xs={12} display="flex" justifyContent="center">
            <CustomButton
              customClasses={{ width: "10%" }}
              label="Add"
              onClick={handleAdd}
              id="role_management_add_role_button"
            />
          </Grid>
        )}
      </>
    );
  };

  return (
    <CustomDialog
      isDialogOpen={open}
      closable
      handleDialogClose={handleClose}
      dialogTitleContent={
        <Box>
          <Typography
            sx={{
              textAlign: "center",
              fontSize: "27px",
              fontWeight: "bold",
            }}
          >
            {edit ? "Update Role" : "Create Role"} 
          </Typography>
        </Box>
      }
      dialogBodyContent={getRoleForm()}
      dialogFooterContent={
        <Grid container sx={classes.centerItemFlex}>
          <Box sx={classes.pageFooter}>
          <CustomButton
              label={edit ? "Update" : "Submit"} 
              onClick={addRoleHandler}
              id="role_management_submit_button"
              loading={loading}
            />
            <CustomButton
              label={"Cancel"}
              onClick={handleClose}
              customClasses={{
                ...classes.cancelButtonStyle,
                color: theme.palette.text.primary,
              }}
              id="role_management_cancel_button"
            />
          </Box>
        </Grid>
      }
      width={"700px"}
      fullScreen={false}
    />
  );
};

export default AddUpdateRoles;
