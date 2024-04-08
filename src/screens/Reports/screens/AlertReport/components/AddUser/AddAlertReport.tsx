import {
  Box,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  SelectChangeEvent,

} from "@mui/material";
import React, { useEffect, useState } from "react";

import usersStyles from "../../AlertReport.styles";

import {
  insertUserField,
  validateAddUserForm,
} from "../../UserTypeAndValidation";
// import uploadUser from "../../../../../assets/images/uploadUser.svg";

import _ from "lodash";
import {
  createUser,
  fetchAccountHandler,
  fetchRole,
  updateUser,
} from "../../service/alertReport.service";
// import hidePasswordIcon from "../../../../../assets/images/Hide.svg";
// import showPasswordIcon from "../../../../../assets/images/Show.svg";
import { store } from "../../../../../../utils/store";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../../../helpers/methods";
import notifiers from "../../../../../../global/constants/NotificationConstants";
import { CustomInput } from "../../../../../../utils/styles";
import strings from "../../../../../../global/constants/StringConstants";
import {
  CustomButton,
  CustomDialog,
} from "../../../../../../global/components";
import moment from "moment";
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
  const [userFormFields, setUserFormFields] = useState<any>(
    insertUserField(props?.selectedUserRowData)
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

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

  // useEffect(() => {
  //   fetchAccountData();
  //   fetchRoleData();
  // }, []);
  const handleValidation = () => {
    const { isValid, errors }: any = validateAddUserForm(
      userFormFields,
      props?.edit
    );
    setUserFormFields({ ...errors });
    return isValid;
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
    setUserFormFields({
      ...userFormFields,
      roleId: {
        value: formFillEvent.target.value,
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

  const insertUserDetails = async () => {
    try {
      setLoading(true);
      const insertUserBody = {
        firstName: userFormFields?.firstName?.value?.trim(),
        lastName: userFormFields?.lastName?.value?.trim(),
        email: userFormFields?.email?.value?.trim()?.toLowerCase(),
        mobileNumber: userFormFields?.mobileNumber?.value,
        userName: userFormFields?.userName?.value?.trim(),
        password: userFormFields?.password?.value,
        roleId: userFormFields?.roleId?.value,
        status: userFormFields?.status?.value,
      };
      if (handleValidation()) {
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
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error?.message) ? error?.message : notifiers?.GENERIC_ERROR
      );
    }
  };

  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
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
              <InputLabel sx={classes.inputLabel} shrink>
                Role
                <Box ml={0.4} sx={classes.star}>
                  *
                </Box>
              </InputLabel>
              <Select
                sx={classes.dropDownStyle}
                id="add_user_roles_dropdown"
                name="accountId"
                value={userFormFields?.roleId?.value}
                onChange={handleSelectRole}
                disabled={props.edit}
                renderValue={
                  userFormFields?.roleId?.value !== ""
                    ? undefined
                    : () => "Select a Role"
                }
                MenuProps={classes.menuProps}
                displayEmpty
                error={
                  userFormFields?.roleId?.value?.length < 4 &&
                  userFormFields?.roleId?.error?.length !== 0
                }
              >
                {["Admin", "User", "Editor"].map((item: any, index: any) => (
                  <MenuItem
                    key={index}
                    value={item}
                    sx={classes.dropDownOptionsStyle}
                  >
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </Stack>
            {!isTruthy(userFormFields?.roleId?.value) && (
              <FormHelperText error sx={classes.errorStyle}>
                {userFormFields.roleId?.error}
              </FormHelperText>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <Stack direction="column">
              <InputLabel sx={classes.inputLabel} shrink>
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
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="add_user_submit_button"
            // label="Add"
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
        {/* <img src={uploadUser} alt="Add user not found!" /> */}
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
