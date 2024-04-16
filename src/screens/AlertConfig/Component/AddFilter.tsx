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
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import uploadUser from "../../../../../assets/images/uploadUser.svg";

import _ from "lodash";
import hidePasswordIcon from "../../../../../assets/images/Hide.svg";
import showPasswordIcon from "../../../assets/images/Show.svg";
import {
  createUser,
  updateUser,
} from "../../Settings/Users/service/user.service";
import { store } from "../../../utils/store";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import {
  insertUserField,
  validateAddUserForm,
} from "../../Settings/Users/UserTypeAndValidation";
import usersStyles from "../../Settings/Users/Users.styles";
import notifiers from "../../../global/constants/NotificationConstants";
import { CustomDialog, CustomInput } from "../../../global/components";
import strings from "../../../global/constants/StringConstants";
import CustomButton from "../../../global/components/NewCustomButton/CustomButton";
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

const AddFilter = (props: CustomProps) => {
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
          {props.edit ? "Update Filter" : "Add Filter"}
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
            id="add_field"
            placeHolder="Enter IMEI number"
            name="imei"
            label="IMEI"
            onChange={handleFormDataChange}
            value={userFormFields?.firstName?.value}
            error={userFormFields?.firstName?.error}
            propsToInputElement={{ maxLength: strings.USER_FIRST_NAME_LIMIT }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{ margin: "1.5rem 0rem" }}
        >
          <Typography
            sx={{
              color: "#212121",
              fontFamily: "SourceSans3_Bold",
              fontWeight: 700,
              marginBottom: "1rem",
            }}
          >
            Set Configuration
          </Typography>

          <Stack
            direction="row"
            spacing={2}
            sx={{ display: "flex", alignItems: "end" }}
          >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Box>
                <Stack direction="column">
                  <InputLabel sx={classes.inputLabel} shrink>
                    Event
                    <Box ml={0.4} sx={classes.star}>
                      *
                    </Box>
                  </InputLabel>
                  <Select
                    sx={classes.dropDownStyle}
                    id="add_filter_status_dropdown"
                    name="event"
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

            <Grid xs={6} sm={6} md={6} lg={6} xl={6}>
              <FormControlLabel
                value="end"
                control={<Checkbox />}
                label="Active"
                labelPlacement="end"
              />
            </Grid>
          </Stack>

          <Stack>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              sx={{ margin: "1rem 0rem", display: "flex", justifyContent: "" }}
            >
              <CustomInput
                label="Start Date"
                type="datetime-local"
                id="scheduleTime"
                name="startDate"
                required
                propsToInputElement={{
                  min: moment().format("YYYY-MM-DDTkk:mm"),
                }}
                // value={formField?.startDate?.value}
                // onChange={handleOnChange}
                // error={
                //   !isTruthy(formField?.startDate?.value) &&
                //   formField?.startDate?.error
                // }
              />
              <Grid />

              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
              >
                <CustomInput
                  label="End Date"
                  type="datetime-local"
                  id="scheduleTime"
                  name="endDate"
                  required
                  propsToInputElement={{
                    min: moment().format("YYYY-MM-DDTkk:mm"),
                  }}
                  // value={formField?.startDate?.value}
                  // onChange={handleOnChange}
                  // error={
                  //   !isTruthy(formField?.startDate?.value) &&
                  //   formField?.startDate?.error
                  // }
                />
              </Grid>
            </Grid>
          </Stack>

        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_mobile_number_field"
            placeHolder="Enter Mobile Number"
            name="mobilenumber"
            label="Mobile Number"
            onChange={handleFormDataChange}
            value={userFormFields?.lastName?.value}
            error={userFormFields?.lastName?.error}
            propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          />
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

  const getAddUserDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={props.openAddUserDialog}
          closable
          closeButtonVisibility
          handleDialogClose={props.handleCloseAddUserDialog}
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

export default AddFilter;
