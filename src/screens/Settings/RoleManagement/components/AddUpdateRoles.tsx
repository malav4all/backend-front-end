import { useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  Grid,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Typography,
  Divider,
  FormHelperText,
  IconButton,
  Container,
  Collapse,
  Stack,
  InputLabel,
  TextField,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  CustomButton,
  CustomInput,
  CustomPaper,
} from "../../../../global/components";
import RoleManagementStyles from "../RoleManagement.styles";
import DelIcon from "../../../../assets/images/Delete.svg";
// import { addRole, updateRole } from "../RoleManagementServices";
import CustomLoader from "../../../../global/components/CustomLoader/CustomLoader";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../helpers/methods";
import notifiers from "../../../../global/constants/NotificationConstants";
import strings from "../../../../global/constants/StringConstants";
import {
  campaignerPreDefinedRoleData,
  createRoleFormData,
  getResourceObj,
  mapFormDataToValues,
  roleFormValidation,
  staticPredefinedRoles,
} from "../RoleManagementHelpers";
import { ReactComponent as ArrowDownIcon } from "../../../../assets/icons/Arrow-Down.svg";
import {
  addRole,
  checkExitsRole,
  fetchIndustryType,
  fetchIndustryTypeWithCode,
  updateRole,
} from "../service/RoleManagement.service";

interface AddUpdateRolesProps {
  name: string;
  setButtonClick: any;
  rowData: any;
  fetchRolesHandler: any;
  resources: any;
  industryType: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const AddUpdateRoles = (props: AddUpdateRolesProps) => {
  const edit = props.name === strings.editRole;
  const classes = RoleManagementStyles;
  const [roleFormData, setRoleFormData] = useState(
    createRoleFormData(props.rowData, edit)
  );
  const [expandedRole, setExpandedRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAdd = () => {
    handleValidation(true) &&
      setRoleFormData({
        ...roleFormData,
        resources: [...roleFormData.resources, getResourceObj()],
      });
  };

  const handlePredefinedCampaignClick = (predefinedResources: any[]) => {
    setRoleFormData((roleData: any) => {
      let tempRoleData = { ...roleData };
      let newResources: any[] = [];
      tempRoleData.resources = tempRoleData.resources.filter(
        (resource: any) =>
          resource.path.value !== "" && resource.permissions.value.length > 0
      );
      predefinedResources.forEach((predefinedResource: any) => {
        const resourceAlreadyExists = tempRoleData.resources.some(
          (item: any) => item.path.value === predefinedResource.path
        );
        if (!resourceAlreadyExists) {
          newResources.push(getResourceObj(predefinedResource));
        }
      });
      tempRoleData.resources = [...tempRoleData.resources, ...newResources];
      return tempRoleData;
    });
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

  const handleValidation = (isAddResourceValidation: boolean = false) => {
    const { isValid, errors } = roleFormValidation(
      roleFormData,
      isAddResourceValidation
    );
    setRoleFormData(errors);
    return isValid;
  };

  const handleRoleNameChange = (e: any) => {
    if (!strings.characterRegex.test(e.target.value)) {
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
    e.target.value.toLowerCase();
    setRoleFormData(tempRoleForm);
  };

  const handleResourcePermissionChange = (e: any, resourceIndex: number) => {
    let tempRoleForm = { ...roleFormData };
    tempRoleForm.resources[resourceIndex].permissions.value = e.target.value;
    tempRoleForm.resources[resourceIndex].permissions.error = "";
    setRoleFormData(tempRoleForm);
  };

  const addRoleHandler = async () => {
    try {
      if (handleValidation()) {
        setLoading(true);
        const body = mapFormDataToValues(roleFormData);
        if (props.name === strings.editRole) {
          await updateRole({
            input: {
              _id: props?.rowData?._id,
              name: body.name,
              industryType: body.industryType,
              description: body.description,
              resources: body.resources,
              isDelete: false,
            },
          });
          openSuccessNotification(`${body.name} role has been updated`);
        } else {
          await addRole({
            input: {
              name: body.name,
              industryType: body.industryType,
              description: body.description,
              resources: body.resources,
            },
          });
          openSuccessNotification("New Role has been added successfully");
        }
        props.setButtonClick(strings.rolesTable);
        await props.fetchRolesHandler();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };

  const checkExitsRoleHandler = async () => {
    try {
      const res = await checkExitsRole({
        input: { name: roleFormData?.name.value },
      });
      if (res?.checkExistsRole?.success === 1) {
        openErrorNotification(res.checkExistsRole.message);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
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
          onBlur={checkExitsRoleHandler}
          error={roleFormData?.name.error}
        />
        <Box mt={2}>
          <Stack direction="column">
            <InputLabel sx={classes.inputLabel} shrink>
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
                roleFormData.industryType.value !== ""
                  ? undefined
                  : () => "Select a Industry Type"
              }
              MenuProps={classes.menuProps}
              displayEmpty
              error={
                roleFormData.industryType.value?.length < 4 &&
                roleFormData.industryType.error?.length !== 0
              }
            >
              {props.industryType?.map((item: any, index: number) => (
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
            <Typography sx={classes.inputLabel}>Description </Typography>
            <Typography sx={classes.star}>*</Typography>
          </Box>
          <TextField
            multiline
            minRows={3}
            inputProps={{ maxLength: 500 }}
            sx={classes.testAreaStyle}
            name="description"
            id="comment"
            //   error={ticketForm.comment.error}
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
      props.resources.length === roleFormData?.resources.length;
    return (
      <>
        {roleFormData?.resources?.map((item: any, resourceIndex: any) => {
          const availableResources = props?.industryType?.find(
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
                  MenuProps={classes.menuProps}
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
                  MenuProps={MenuProps}
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
              <Grid item xs={12} sm={1}>
                <IconButton
                  onClick={() => deleteRoleHandler(resourceIndex)}
                  sx={classes.resourceActionButton}
                  id="role_management_delete_role"
                >
                  <Box component={"img"} src={DelIcon} />
                </IconButton>
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

  const handleCampaignPredefinedRole = (item: any) => {
    setExpandedRole((prevRole) => (prevRole === item.name ? null : item.name));
  };

  const campaignPreDefinedRole = () => {
    return (
      <Tooltip
        title={
          <CustomPaper className={{ backgroundColor: "#888888" }}>
            <Typography sx={classes.predefinedTooltipContent}>
              {"Use this predefined role for Create Campaign"}
            </Typography>
          </CustomPaper>
        }
        placement="top"
        arrow
        componentsProps={{
          tooltip: {
            sx: {
              background: "none",
            },
          },
        }}
      >
        <Box
          sx={classes.campaignPerDefined}
          onClick={() =>
            handlePredefinedCampaignClick(campaignerPreDefinedRoleData)
          }
          component={"div"}
          id="role_management_predefined_role"
        >
          <Box sx={classes.predefinedGridItem} mt={4} ml={2}>
            {campaignerPreDefinedRoleData?.map((item: any) => {
              const isRoleExpanded = item.name === expandedRole;

              return (
                <>
                  <Box sx={{ padding: "10px" }} component={"div"}>
                    <Box component={"span"} style={classes.predefinedRoleName}>
                      {item.name}
                    </Box>
                    <Box component={"span"} sx={{ ml: 1 }}>
                      <ArrowDownIcon
                        onClick={(e: any) => {
                          // This one added Because Main Box Click Call in this Click
                          e.stopPropagation();
                          handleCampaignPredefinedRole(item);
                        }}
                      />
                    </Box>
                  </Box>
                  <Collapse in={isRoleExpanded}>
                    <Box
                      sx={{
                        maxHeight: "100px",
                        overflowY: "auto",
                        "::-webkit-scrollbar": {
                          display: "none",
                        },
                      }}
                    >
                      <List sx={classes.predefinedListStyle}>
                        {item?.permissions?.map(
                          (listData: any, index: number) => {
                            return (
                              <ListItem
                                key={index}
                                sx={classes.predefinedListItem}
                              >
                                {listData}
                              </ListItem>
                            );
                          }
                        )}
                      </List>
                    </Box>
                  </Collapse>
                </>
              );
            })}
          </Box>
        </Box>
      </Tooltip>
    );
  };

  const submitHandler = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.pageFooter}>
          <CustomButton
            label={props.name === strings.editRole ? "Update" : "Submit"}
            onClick={() => {
              addRoleHandler();
            }}
            id="role_management_submit_button"
          />
          <CustomButton
            label={"Cancel"}
            onClick={() => {
              props.setButtonClick(strings.rolesTable);
            }}
            customClasses={classes.cancelButtonStyle}
            id="role_management_cancel_button"
          />
        </Box>
      </Grid>
    );
  };

  return (
    <>
      <Container maxWidth="md">
        <Typography my={2} sx={classes.predefinedHeader}>
          {props.name}
        </Typography>
        <Divider sx={{ my: 2 }} />
        {getRoleForm()}
        {/* {preDefinedRole()} */}
        {submitHandler()}
      </Container>
      <CustomLoader isLoading={loading} />
    </>
  );
};
