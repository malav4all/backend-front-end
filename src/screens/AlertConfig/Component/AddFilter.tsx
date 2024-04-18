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

import _ from "lodash";
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
import usersStyles from "../../Settings/Users/Users.styles";
import notifiers from "../../../global/constants/NotificationConstants";
import { CustomDialog, CustomInput } from "../../../global/components";
import strings from "../../../global/constants/StringConstants";
import CustomButton from "../../../global/components/NewCustomButton/CustomButton";
import moment from "moment";
import { insertUserField, validateAddUserForm } from "../AlertConfig.helpers";
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
  const handleFormDataChange = (
    formFillEvent: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = formFillEvent.target;

    if (name === "eventName") {
      setUserFormFields((prevState: any) => ({
        ...prevState,
        alertData: [
          {
            eventName: { value, error: "" },
          },
        ],
      }));
    } else {
      setUserFormFields((prevState: any) => ({
        ...prevState,
        [name]: {
          value,
          error: "",
        },
      }));
    }
  };

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

  console.log(userFormFields);

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
        // imei: userFormFields?.imei?.value?.trim(),
        // alert: userFormFields?.lastName?.value?.trim(),
        // email: userFormFields?.email?.value?.trim()?.toLowerCase(),
        // mobileNumber: userFormFields?.mobileNumber?.value,
        // userName: userFormFields?.userName?.value?.trim(),
        // password: userFormFields?.password?.value,
        // roleId: userFormFields?.roleId?.value,
        // status: userFormFields?.status?.value,
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

  // console.log(userFormFields);

  const addUserDialogBody = () => {
    return (
      <Grid container spacing={2} sx={{ padding: "1rem" }}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <CustomInput
            label="Alert Name"
            placeHolder="Enter Alert name"
            value={userFormFields?.alertName?.value}
            required
            name="alertName"
            onChange={handleFormDataChange}
            error={userFormFields?.alertName?.error}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <CustomInput
            required
            id="add_mobile_number_field"
            placeHolder="Enter Mobile Number"
            name="mobileNo"
            label="Mobile Number"
            onChange={handleFormDataChange}
            value={userFormFields?.mobileNo?.value}
            error={userFormFields?.mobileNo?.error}
            propsToInputElement={{ maxLength: strings.USER_LAST_NAME_LIMIT }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
          sx={{ marginBottom: "0.5rem" }}
        >
          <CustomInput
            required
            id="add_field"
            placeHolder="Enter IMEI number"
            name="imei"
            label="IMEI"
            onChange={handleFormDataChange}
            value={userFormFields?.imei?.value}
            error={userFormFields?.imei?.error}
            propsToInputElement={{ maxLength: strings.USER_FIRST_NAME_LIMIT }}
          />
        </Grid>

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
                id="add_filter_status_dropdown"
                name="eventName"
                value={userFormFields.alertDate[0].eventName?.value}
                onChange={handleFormDataChange}
                MenuProps={classes.menuProps}
                displayEmpty
                renderValue={() =>
                  userFormFields.alertDate[0].eventName?.value || "Select Event"
                }
              >
                <MenuItem value={"Geozone In"}>Geozone In</MenuItem>
                <MenuItem value={"Geozone Out"}>Geozone Out</MenuItem>
              </Select>

              {!isTruthy(userFormFields?.status?.value) && (
                <FormHelperText error sx={classes.errorStyle}>
                  {userFormFields.status?.error}
                </FormHelperText>
              )}
            </Stack>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          sx={{
            backgroundColor: "#F1EDFF",
            borderRadius: "5px",
            padding: "1rem",
            marginTop: "1rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>this is area to display multiple events</Box>
          <CustomButton
            id="add_user_cancel_button"
            label="Add"
            onClick={() => {
              props?.handleCloseAddUserDialog();
              console.log(userFormFields);
            }}
            customClasses={classes.cancelButtonStyle}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <CustomInput
              label="Start Date"
              type="datetime-local"
              id="scheduleTime"
              name="startDate"
              value={userFormFields?.startDate?.value}
              onChange={handleFormDataChange}
              propsToInputElement={{
                min: moment().format("YYYY-MM-DDTkk:mm"),
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
          <Box>
            <CustomInput
              label="End Date"
              type="datetime-local"
              id="scheduleTime"
              name="endDate"
              value={userFormFields?.endDate?.value}
              onChange={handleFormDataChange}
              propsToInputElement={{
                min: moment().format("YYYY-MM-DDTkk:mm"),
              }}
            />
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
            onClick={() => {
              props?.handleCloseAddUserDialog();
              console.log(userFormFields);
            }}
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
