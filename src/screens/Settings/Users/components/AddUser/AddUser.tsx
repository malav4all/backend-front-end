import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  Typography,
  SelectChangeEvent,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomContactNumberInput,
  CustomDialog,
  CustomInput,
} from "../../../../../global/components";
import usersStyles from "../../Users.styles";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../../helpers/methods";
import {
  insertUserField,
  validateAddUserForm,
} from "../../UserTypeAndValidation";
import uploadUser from "../../../../../assets/images/uploadUser.svg";
import strings from "../../../../../global/constants/StringConstants";
import _ from "lodash";
import { addUserPayload } from "../../UsersInterface";
import {
  createUser,
  fetchAccountHandler,
  fetchRole,
  updateUser,
} from "../../service/user.service";
import { store } from "../../../../../utils/store";
import notifiers from "../../../../../global/constants/NotificationConstants";
import hidePasswordIcon from "../../../../../assets/images/Hide.svg";
import showPasswordIcon from "../../../../../assets/images/Show.svg";
import { fetchDeviceGroup } from "../../../../DeviceGroup/service/DeviceGroup.service";
import { headerColor } from "../../../../../utils/styles";
interface CustomProps {
  openAddUserDialog: boolean;
  handleCloseAddUserDialog: Function;
  managerMail: string[];
  roles: any[];
  location?: any;
  tableData: Function;
  isLoading: boolean;
  edit?: boolean;
  selectedUserRowData?: any;
  setEdit?: any;
}

const AddUser = (props: CustomProps) => {
  const classes = usersStyles;
  const theme = useTheme();
  const [userFormFields, setUserFormFields] = useState<any>(
    insertUserField(props?.selectedUserRowData)
  );
  const [isLoading, setIsLoading] = useState<any>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [deviceGroup, setDeviceGroup] = useState<any>([]);
  const [accountData, setAccountData] = useState<any>([]);
  const [roleData, setRoleData] = useState([]);
  useEffect(() => {
    props.setEdit?.(false);
    setUserFormFields(insertUserField());
  }, [props?.openAddUserDialog]);

  useEffect(() => {
    if (props?.edit && props?.selectedUserRowData) {
      props.setEdit?.(true);
      setUserFormFields(insertUserField(props?.selectedUserRowData));
    }
  }, [props?.selectedUserRowData]);

  useEffect(() => {
    fetchDeviceGroupData();
    fetchAccountData();
    fetchRoleData();
  }, []);
  const fetchDeviceGroupData = async () => {
    try {
      setIsLoading(true);
      const res = await fetchDeviceGroup({
        input: {
          page: -1,
          limit: 10,
        },
      });
      setDeviceGroup(res?.fetchDeviceGroup?.data);
      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const handleValidation = () => {
    const { isValid, errors }: any = validateAddUserForm(
      userFormFields,
      props?.edit
    );
    setUserFormFields({ ...errors });
    return isValid;
  };

  const handleSelectAccount = (formFillEvent: SelectChangeEvent<any>) => {
    const selectedAccount = accountData.find(
      (account: any) => account.accountName === formFillEvent.target.value
    );

    setUserFormFields({
      ...userFormFields,
      accountName: {
        value: formFillEvent.target.value,
        error: "",
      },
      accountId: {
        value: selectedAccount?._id ?? "",
        error: "",
      },
    });
  };

  const handleFormDataChange = (formFillEvent: React.ChangeEvent<any>) => {
    setUserFormFields({
      ...userFormFields,
      [formFillEvent?.target?.name]: {
        ...userFormFields[formFillEvent?.target?.name],
        value: formFillEvent?.target?.value,
        error: "",
      },
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(showPassword);
  };

  const handleSelectRole = (formFillEvent: SelectChangeEvent<any>) => {
    const selectedRole: any = roleData.find(
      (role: any) => role.name === formFillEvent.target.value
    );

    setUserFormFields({
      ...userFormFields,
      roleName: {
        value: formFillEvent.target.value,
        error: "",
      },
      roleId: {
        value: selectedRole?._id ?? "",
        error: "",
      },
    });
  };

  const handleSelectStatus = (formFillEvent: SelectChangeEvent<any>) => {
    setUserFormFields({
      ...userFormFields,
      status: {
        value: formFillEvent.target.value,
        error: "",
      },
    });
  };

  const addUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>
          {props.edit ? "Update User" : "Add User"}
        </Typography>
      </Box>
    );
  };

  const fetchAccountData = async () => {
    try {
      const res = await fetchAccountHandler({
        input: { page: -1, limit: 0 },
      });
      setAccountData(res?.fetchAccountModuleList?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchRoleData = async () => {
    try {
      const res = await fetchRole({
        input: { page: -1, limit: 0 },
      });
      setRoleData(res?.roleListAll?.data);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const insertUserDetails = async () => {
    try {
      setIsLoading(true);
      const insertUserBody = {
        firstName: userFormFields?.firstName?.value?.trim(),
        lastName: userFormFields?.lastName?.value?.trim(),
        email: userFormFields?.email?.value?.trim()?.toLowerCase(),
        mobileNumber: userFormFields?.mobileNumber?.value,
        userName: userFormFields?.userName?.value?.trim(),
        password: userFormFields?.password?.value,
        roleId: userFormFields?.roleId?.value,
        roleName: userFormFields?.roleName?.value,
        status: userFormFields?.status?.value,
        accountId: userFormFields.accountId.value,
        accountName: userFormFields.accountName.value,
      };

      if (props.edit) {
        const res = await updateUser({
          input: {
            _id: props?.selectedUserRowData?._id,
            ...insertUserBody,
            createdBy: store.getState().auth.userName,
          },
        });
        props.handleCloseAddUserDialog(false);
        openSuccessNotification(res?.updateUser?.message);
        await props.tableData?.();
      } else {
        const res = await createUser({
          input: {
            ...insertUserBody,
            createdBy: store.getState().auth.userName,
          },
        });
        props.handleCloseAddUserDialog(false);
        openSuccessNotification(res?.createUser?.message);
        await props.tableData?.();
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error?.message) ? error?.message : notifiers?.GENERIC_ERROR
      );
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_user_first_name_field"
            placeHolder="Enter First name"
            name="firstName"
            label="First Name"
            onChange={handleFormDataChange}
            value={userFormFields?.firstName?.value}
            error={userFormFields?.firstName?.error}
            propsToInputElement={{ maxLength: strings.USER_FIRST_NAME_LIMIT }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_user_last_name_field"
            placeHolder="Enter last name"
            name="lastName"
            label="Last Name"
            onChange={handleFormDataChange}
            value={userFormFields?.lastName?.value}
            error={userFormFields?.lastName?.error}
            propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_user_email_field"
            placeHolder="Enter Your email"
            name="email"
            label="Email"
            onChange={handleFormDataChange}
            value={userFormFields.email?.value}
            error={userFormFields.email?.error}
            propsToInputElement={{ maxLength: strings.USER_EMAIL_LIMIT }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            label="Contact Number"
            name="mobileNumber"
            required={true}
            id="add_user_contact_number_filed"
            value={userFormFields.mobileNumber?.value}
            placeHolder="Enter Your Mobile Number"
            onChange={handleFormDataChange}
            error={userFormFields?.mobileNumber?.error}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_user_address_field"
            placeHolder="Enter your username"
            name="userName"
            label="User Name"
            onChange={handleFormDataChange}
            value={userFormFields?.userName?.value}
            error={userFormFields?.userName?.error}
          />
        </Grid>
        {!props.edit && (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CustomInput
              placeHolder="••••••••"
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={userFormFields?.password?.value}
              disabled={props.edit}
              onChange={handleFormDataChange}
              error={userFormFields?.password?.error}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                      sx={{
                        color: theme.palette.text.primary,
                      }}
                    >
                      <Box
                        component="img"
                        src={showPassword ? showPasswordIcon : hidePasswordIcon}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        )}

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_user_allowed_email_field"
            placeHolder="Created By"
            name="createdBy"
            disabled={true}
            label="Created By"
            value={userFormFields?.createdBy?.value}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Role
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="roleName"
                value={userFormFields.roleName.value}
                onChange={handleSelectRole}
                renderValue={
                  userFormFields.roleName.value !== ""
                    ? undefined
                    : () => "Select a Role"
                }
                MenuProps={classes.menuProps}
                displayEmpty
                error={
                  userFormFields.roleName.value.length < 4 &&
                  userFormFields.roleName.error.length !== 0
                }
              >
                {roleData.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item.name}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Status
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_status_dropdown"
                name="status"
                value={userFormFields?.status?.value}
                onChange={handleSelectStatus}
                MenuProps={classes.menuProps}
                displayEmpty
                renderValue={() =>
                  userFormFields?.status?.value || "Select Status"
                }
                error={
                  !isTruthy(userFormFields?.status?.value) &&
                  userFormFields?.status?.error
                }
              >
                {["Active", "Inactive"].map((item, index) => (
                  <MenuItem
                    key={index}
                    value={item}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(userFormFields?.status?.value) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.status?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel
                sx={{
                  ...classes.inputLabel,
                  color: theme.palette.text.primary,
                }}
                shrink
              >
                Account
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_accounts_dropdown"
                name="accountName"
                value={userFormFields.accountName.value}
                onChange={handleSelectAccount}
                renderValue={
                  userFormFields.accountName.value !== ""
                    ? undefined
                    : () => "Select an Account"
                }
                MenuProps={classes.menuProps}
                displayEmpty
                error={
                  userFormFields.accountName.value.length < 4 &&
                  userFormFields.accountName.error.length !== 0
                }
              >
                {accountData.map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item.accountName}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item.accountName}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            {!isTruthy(userFormFields.accountName.value) && (
              <FormHelperText error sx={classes.errorStyle}>
                {userFormFields.accountName.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>
      </Grid>
    );
  };

  const addUserDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_user_cancel_button"
            label="Cancel"
            onClick={() => props?.handleCloseAddUserDialog()}
            customClasses={{
              ...classes.cancelButtonStyle,
              color: theme.palette.text.primary,
              backgroundColor: "#00000000",
            }}
          />
          <CustomButton
            id="add_user_submit_button"
            label={props.edit ? "Update" : "Add"}
            onClick={insertUserDetails}
          />
        </Box>
      </Grid>
    );
  };

  const addUserHeaderImg = () => {
    return (
      <Box display={"flex"}>
        <img src={uploadUser} alt="Add user not found!" />
      </Box>
    );
  };

  const getAddUserDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={props.openAddUserDialog}
          closable
          closeButtonVisibility
          handleDialogClose={props.handleCloseAddUserDialog}
          dialogHeaderContent={addUserHeaderImg()}
          dialogTitleContent={addUserDialogTitle()}
          dialogBodyContent={addUserDialogBody()}
          dialogFooterContent={addUserDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
    );
  };

  return <Box>{getAddUserDialog()}</Box>;
};

export default AddUser;
