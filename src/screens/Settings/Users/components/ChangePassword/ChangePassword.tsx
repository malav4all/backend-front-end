import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
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
import {
  changePasswordField,
  changePasswordValidationForm,
} from "../../UserTypeAndValidation";
import uploadUser from "../../../../../assets/images/uploadUser.svg";
import _ from "lodash";
import { changePassword } from "../../service/user.service";
import notifiers from "../../../../../global/constants/NotificationConstants";
import hidePasswordIcon from "../../../../../assets/images/Hide.svg";
import showPasswordIcon from "../../../../../assets/images/Show.svg";
interface CustomProps {
  openChangePasswordDialog: boolean;
  handleCloseChangePasswordDialog: Function;
  edit?: boolean;
  location?: any;
  tableData: any;
  isLoading: boolean;
}

const ChangePassword = (props: CustomProps) => {
  let emailId = props.tableData;
  const classes = usersStyles;
  const [changePasswordFormFields, setChangePasswordFormFields] = useState<any>(
    changePasswordField()
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    setChangePasswordFormFields(changePasswordField());
  }, [props.openChangePasswordDialog]);

  const handleFormDataChange = (formFillEvent: React.ChangeEvent<any>) => {
    setChangePasswordFormFields({
      ...changePasswordFormFields,
      [formFillEvent.target.name]: {
        ...changePasswordFormFields[formFillEvent.target.name],
        value: formFillEvent.target.value,
      },
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const changePasswordDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Change Password</Typography>
      </Box>
    );
  };

  const changePasswordDetails = async () => {
    setLoading(true);

    const validationResults = changePasswordValidationForm(
      changePasswordFormFields
    );
    if (
      changePasswordFormFields.newPassword.value.length === 0 ||
      changePasswordFormFields.confirmPassword.value.length === 0
    ) {
      setLoading(false);
      return openErrorNotification("Field should not be empty");
    }

    if (
      changePasswordFormFields.newPassword.value !==
      changePasswordFormFields.confirmPassword.value
    ) {
      setLoading(false);
      return openErrorNotification(
        "New password and confirm password do not match"
      );
    }

    if (!validationResults.isValid) {
      setChangePasswordFormFields(validationResults.errors);
      setLoading(false);
      return openErrorNotification(validationResults.errors.message);
    }

    const insertUserBody: any = {
      password: changePasswordFormFields.newPassword?.value,
      accountId: changePasswordFormFields.confirmPassword?.value,
    };

    try {
      const res = await changePassword({
        input: {
          email: emailId!,
          password: insertUserBody.password!,
        },
      });
      openSuccessNotification("Password Change Successful");
      props.handleCloseChangePasswordDialog(false);
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
    setLoading(false);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const changePasswordDialogBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            placeHolder="••••••••"
            id="newPassword"
            label="New Password"
            type={showPassword ? "text" : "password"}
            name="newPassword"
            value={changePasswordFormFields.newPassword?.value}
            onChange={handleFormDataChange}
            error={
              !isTruthy(changePasswordFormFields.newPassword?.value) &&
              changePasswordFormFields.newPassword?.error
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
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
        <Grid item xs={12}>
          <CustomInput
            placeHolder="••••••••"
            id="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={changePasswordFormFields.confirmPassword?.value}
            onChange={handleFormDataChange}
            error={
              !isTruthy(changePasswordFormFields.confirmPassword?.value) &&
              changePasswordFormFields.confirmPassword?.error
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    <Box
                      component="img"
                      src={
                        showConfirmPassword
                          ? showPasswordIcon
                          : hidePasswordIcon
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    );
  };

  const changePasswordDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="add_user_cancel_button"
            label="Cancel"
            onClick={() => props?.handleCloseChangePasswordDialog()}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="add_user_submit_button"
            label="Submit"
            onClick={changePasswordDetails}
            loading={loading}
          />
        </Box>
      </Grid>
    );
  };

  const changePasswordHeaderImg = () => {
    return (
      <Box display={"flex"}>
        <img src={uploadUser} alt="Add user not found!" />
      </Box>
    );
  };

  const handleClose = () => {
    props.handleCloseChangePasswordDialog(false);
  };
  const changePasswordDialog = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <CustomDialog
          isDialogOpen={props.openChangePasswordDialog}
          closable
          closeButtonVisibility
          handleDialogClose={handleClose}
          dialogHeaderContent={changePasswordHeaderImg()}
          dialogTitleContent={changePasswordDialogTitle()}
          dialogBodyContent={changePasswordDialogBody()}
          dialogFooterContent={changePasswordDialogFooter()}
          width={"700px"}
          fullScreen={false}
        />
      </Grid>
    );
  };

  return <Box>{changePasswordDialog()}</Box>;
};

export default ChangePassword;
