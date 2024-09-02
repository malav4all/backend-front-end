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
  Autocomplete,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../../../global/components";
import usersStyles from "../../Users.styles";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../../helpers/methods";
import { insertUserField } from "../../UserTypeAndValidation";
import uploadUser from "../../../../../assets/images/uploadUser.svg";
import strings from "../../../../../global/constants/StringConstants";
import _ from "lodash";
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
import {
  fetchDeviceGroup,
  fetchDeviceList,
} from "../../../../DeviceGroup/service/DeviceGroup.service";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

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

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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
  const [deviceGroupValue, setDeviceGroupValue] = useState<any>([]);
  const [roleData, setRoleData] = useState([]);
  const [imeiData, setImeiData] = useState<any>([]);
  const [selectedImeis, setSelectedImeis] = useState<any>([]);

  const authState = store.getState().auth;

  useEffect(() => {
    props.setEdit?.(false);
    // setUserFormFields(insertUserField());
  }, [props?.openAddUserDialog]);

  useEffect(() => {
    if (props?.edit && props?.selectedUserRowData) {
      props.setEdit?.(true);
      setUserFormFields(insertUserField(props?.selectedUserRowData));
      setUserFormFields((prevFields: any) => ({
        ...prevFields,
        accountId: {
          value: props?.selectedUserRowData?.accountId || "",
          error: "",
        },
        deviceGroupAccountId: {
          value: props?.selectedUserRowData?.accountId || "",
          error: "",
        },
      }));
    }
  }, [props?.selectedUserRowData]);

  useEffect(() => {
    fetchAccountData();
    fetchRoleData();
  }, []);

  useEffect(() => {
    if (userFormFields?.deviceGroupAccountId?.value) {
      fetchDeviceGroupData();
      fetchImeiData();
    }
  }, [userFormFields?.deviceGroupAccountId?.value]);

  const fetchDeviceGroupData = async () => {
    try {
      setIsLoading(true);

      const res = await fetchDeviceGroup({
        input: {
          accountId: userFormFields?.deviceGroupAccountId?.value,
          page: -1,
          limit: 10,
        },
      });

      const fetchedDeviceGroups = res?.fetchDeviceGroup?.data || [];

      // Ensure deviceGroup is an array before mapping
      const selectedDeviceGroupNames = Array.isArray(
        props?.selectedUserRowData?.deviceGroup
      )
        ? props?.selectedUserRowData?.deviceGroup.map(
            (group: any) => group.deviceGroupName
          )
        : [];

      const selectedDeviceGroups = fetchedDeviceGroups
        .filter((group: any) =>
          selectedDeviceGroupNames.includes(group.deviceGroupName)
        )
        .map((group: any) => group.deviceGroupName);

      // Set state after filtering
      setDeviceGroup(fetchedDeviceGroups);
      setDeviceGroupValue(selectedDeviceGroups);
      setUserFormFields((prevFields: any) => ({
        ...prevFields,
        deviceGroupName: {
          value: selectedDeviceGroups,
          error: "",
        },
      }));

      setIsLoading(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
      setIsLoading(false);
    }
  };

  const fetchImeiData = async () => {
    try {
      const res = await fetchDeviceList({
        input: { accountId: userFormFields?.deviceGroupAccountId?.value },
      });

      const imeiList = res?.getImeiList?.imeiList || [];

      // Ensure props?.selectedUserRowData?.imeiList is an array before filtering
      const selectedImeis = Array.isArray(props?.selectedUserRowData?.imeiList)
        ? imeiList.filter((imei: any) =>
            props?.selectedUserRowData?.imeiList.includes(imei)
          )
        : [];

      setImeiData(imeiList);
      setSelectedImeis(selectedImeis);
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  const fetchAccountData = async () => {
    try {
      const res = await fetchAccountHandler({
        input: { page: -1, limit: 10000 },
      });
      setAccountData(res?.fetchAccountModuleList?.data);
      if (res?.fetchAccountModuleList?.data.length === 1) {
        setUserFormFields({
          ...userFormFields,
          accountName: {
            value: res?.fetchAccountModuleList?.data[0].accountName,
            error: "",
          },
          accountId: {
            value: res?.fetchAccountModuleList?.data[0]?.accountId,
            error: "",
          },
          deviceGroupAccountId: {
            value: res?.fetchAccountModuleList?.data[0].accountId,
            error: "",
          },
        });
      }
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
        value: selectedAccount?.accountId ?? "",
        error: "",
      },
      deviceGroupAccountId: {
        value: selectedAccount?.accountId ?? "",
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

  const handleDeviceGroup = (formFillEvent: any) => {
    const selectedDeviceGroups = formFillEvent?.target?.value;

    const selectedDeviceGroupObjects = selectedDeviceGroups.map(
      (value: string) =>
        deviceGroup.find((group: any) => group?.deviceGroupName === value)
    );

    // Update the state to reflect the selected device groups
    setDeviceGroupValue(selectedDeviceGroupObjects);
    setUserFormFields({
      ...userFormFields,
      deviceGroupName: {
        value: selectedDeviceGroups,
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

  const validateForm = () => {
    let isValid = true;
    const errors: any = {};

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const contactNumberRegex = /^[0-9]{10}$/;

    if (!userFormFields.firstName.value.trim()) {
      errors.firstName = "First Name is required";
      isValid = false;
    }

    if (!userFormFields.lastName.value.trim()) {
      errors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!userFormFields.email.value.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userFormFields.email.value)) {
      errors.email = "Invalid email format";
      isValid = false;
    }

    if (!userFormFields.mobileNumber.value.trim()) {
      errors.mobileNumber = "Contact Number is required";
      isValid = false;
    } else if (!contactNumberRegex.test(userFormFields.mobileNumber.value)) {
      errors.mobileNumber = "Contact Number must be exactly 10 digits.";
      isValid = false;
    }

    if (!userFormFields.userName.value.trim()) {
      errors.userName = "User Name is required";
      isValid = false;
    }

    if (!props.edit) {
      if (!userFormFields.password.value.trim()) {
        errors.password = "Password is required";
        isValid = false;
      } else if (!passwordRegex.test(userFormFields.password.value)) {
        errors.password =
          "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.";
        isValid = false;
      }
    }

    if (!userFormFields.roleName.value.trim()) {
      errors.roleName = "Role is required";
      isValid = false;
    }

    if (!userFormFields.status.value.trim()) {
      errors.status = "Status is required";
      isValid = false;
    }

    if (!userFormFields.accountName.value.trim()) {
      errors.accountName = "Account is required";
      isValid = false;
    }

    setUserFormFields((prevState: any) => ({
      ...prevState,
      firstName: {
        ...prevState.firstName,
        error: errors.firstName || "",
      },
      lastName: {
        ...prevState.lastName,
        error: errors.lastName || "",
      },
      email: {
        ...prevState.email,
        error: errors.email || "",
      },
      mobileNumber: {
        ...prevState.mobileNumber,
        error: errors.mobileNumber || "",
      },
      userName: {
        ...prevState.userName,
        error: errors.userName || "",
      },
      password: {
        ...prevState.password,
        error: errors.password || "",
      },
      roleName: {
        ...prevState.roleName,
        error: errors.roleName || "",
      },
      status: {
        ...prevState.status,
        error: errors.status || "",
      },
      accountName: {
        ...prevState.accountName,
        error: errors.accountName || "",
      },
    }));

    return isValid;
  };

  const insertUserDetails = async () => {
    if (!validateForm()) {
      return;
    }

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
        deviceGroup: deviceGroupValue,
        imeiList: userFormFields?.imeiList?.value,
        isAccountAdmin: userFormFields?.isAccountAdmin?.value,
        isSuperAdmin: userFormFields?.isSuperAdmin?.value,
      };

      if (props.edit) {
        const res = await updateUser({
          input: {
            _id: props?.selectedUserRowData?._id,
            ...insertUserBody,
            updatedBy: store.getState().auth.userName,
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
        setUserFormFields(insertUserField());
        props.handleCloseAddUserDialog(false);
        openSuccessNotification(res?.createUser?.message);
        await props.tableData?.();
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error?.message) ? error?.message : notifiers?.GENERIC_ERROR
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      setSelectedImeis(imeiData);
      setUserFormFields({
        ...userFormFields,
        imeiList: {
          value: imeiData,
          error: "",
        },
      });
    } else {
      setSelectedImeis([]);
      setUserFormFields({
        ...userFormFields,
        imeiList: {
          value: [],
          error: "",
        },
      });
    }
  };

  const isOptionSelected = (option: any) => {
    return selectedImeis?.includes(option);
  };

  const handleChange = (event: any, value: any) => {
    const filteredValues = value.filter((v: any) => v !== "Select All");
    setSelectedImeis(filteredValues);
    setUserFormFields({
      ...userFormFields,
      imeiList: {
        value: filteredValues,
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
              {!!userFormFields.roleName.error && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.roleName.error}
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
                {props.edit ? (
                  ["Active", "Inactive"].map((item, index) => (
                    <MenuItem
                      key={index}
                      value={item}
                      sx={classes.dropDownOptionsStyle}
                    >
                      {item}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="Active" sx={classes.dropDownOptionsStyle}>
                    Active
                  </MenuItem>
                )}
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
              {!!userFormFields.accountName.error && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.accountName.error}
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
                Device Group
              </InputLabel>
              <Select
                multiple
                sx={classes.dropDownStyle}
                id="add_user_device_group_dropdown"
                name="deviceGroup"
                value={userFormFields?.deviceGroupName?.value || []}
                onChange={handleDeviceGroup}
                MenuProps={classes.menuProps}
                displayEmpty
                renderValue={(selected) =>
                  selected.length > 0
                    ? selected.join(", ")
                    : "Select Device Group"
                }
                error={
                  !isTruthy(userFormFields?.deviceGroupName?.value?.length) &&
                  userFormFields?.deviceGroupName?.error
                }
              >
                {deviceGroup.map((item: any, index: any) => (
                  <MenuItem key={index} value={item.deviceGroupName}>
                    <Checkbox
                      checked={userFormFields.deviceGroupName?.value?.includes(
                        item.deviceGroupName
                      )}
                    />
                    {item.deviceGroupName}
                  </MenuItem>
                ))}
              </Select>
              {!isTruthy(userFormFields?.deviceGroupName?.value?.length) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.deviceGroupName?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <InputLabel
              sx={{ ...classes.inputLabel, color: theme.palette.text.primary }}
              shrink
            >
              Imei List
            </InputLabel>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={["Select All", ...imeiData]}
              disableCloseOnSelect
              getOptionLabel={(option) =>
                typeof option === "string" ? option : option
              }
              value={selectedImeis}
              sx={{
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "5px",
                height: "47px",
                overflowY: "hidden",
              }}
              onChange={handleChange}
              placeholder="Enter Device Group Name"
              renderOption={(props, option, { selected }) => {
                if (option === "Select All") {
                  return (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selectedImeis.length === imeiData.length}
                        indeterminate={
                          selectedImeis.length > 0 &&
                          selectedImeis.length < imeiData.length
                        }
                        onChange={handleSelectAll}
                      />
                      Select All
                    </li>
                  );
                }
                return (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={isOptionSelected(option)}
                    />
                    {option}
                  </li>
                );
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder={selectedImeis.length === 0 ? "Select IMEI" : ""}
                  InputProps={{
                    ...params.InputProps,
                    sx: {
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      color: "white",
                      backgroundColor: "#060b25",
                      padding: 0,
                    },
                  }}
                />
              )}
            />
          </Box>
        </Grid>

        {authState.isSuperAdmin && (
          <>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box
                sx={{
                  textAlign: "end",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <FormGroup
                  sx={{
                    textAlign: "end",
                    display: "flex",
                    justifyContent: "start",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={userFormFields.isAccountAdmin.value}
                        onChange={(event: any) =>
                          setUserFormFields((prevFields: any) => ({
                            ...prevFields,
                            isAccountAdmin: {
                              value: event.target.checked,
                              error: "",
                            },
                          }))
                        }
                        color="warning"
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Account Admin"
                    labelPlacement="start"
                    sx={{
                      flexDirection: "column-reverse",
                      alignItems: "start",
                    }}
                  />
                </FormGroup>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box
                sx={{
                  textAlign: "end",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                }}
              >
                <FormGroup
                  sx={{
                    textAlign: "end",
                    flexDirection: "column",
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={userFormFields.isSuperAdmin.value}
                        onChange={(event: any) =>
                          setUserFormFields((prevFields: any) => ({
                            ...prevFields,
                            isSuperAdmin: {
                              value: event.target.checked,
                              error: "",
                            },
                          }))
                        }
                        color="warning"
                        inputProps={{ "aria-label": "controlled" }}
                      />
                    }
                    label="Super Admin"
                    labelPlacement="top"
                    sx={{
                      flexDirection: "column-reverse",
                      alignItems: "start",
                    }}
                  />
                </FormGroup>
              </Box>
            </Grid>
          </>
        )}

        {authState.isAccountAdmin && !authState.isSuperAdmin && (
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <Box
              sx={{
                textAlign: "end",
                display: "flex",
                justifyContent: "start",
              }}
            >
              <FormGroup
                sx={{
                  textAlign: "end",
                  display: "flex",
                  justifyContent: "start",
                }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={userFormFields.isAccountAdmin.value}
                      onChange={(event: any) =>
                        setUserFormFields((prevFields: any) => ({
                          ...prevFields,
                          isAccountAdmin: {
                            value: event.target.checked,
                            error: "",
                          },
                        }))
                      }
                      color="warning"
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Account Admin"
                  labelPlacement="start"
                  sx={{
                    flexDirection: "column-reverse",
                    alignItems: "start",
                  }}
                />
              </FormGroup>
            </Box>
          </Grid>
        )}
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
            loading={isLoading}
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
