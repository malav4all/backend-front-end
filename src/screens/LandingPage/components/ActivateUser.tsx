import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, FormHelperText } from "@mui/material";
import { useLocation } from "react-router-dom";
import { CustomButton } from "../../../global/components";
import { BootstrapInput } from "../../../utils/styles";
import history from "../../../utils/history";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";

import notifiers from "../../../global/constants/NotificationConstants";
import ActivateUserStyles from "./ActivateUser.styles";

const ActivateUser = () => {
  const classes = ActivateUserStyles;
  const [user, setUser] = useState<any>();
  const context = new URLSearchParams(useLocation().search).get("context");
  const [newPasswordType, setNewPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const [newPasswordIconType, setNewPasswordIconType] = useState(false);
  const [confirmPasswordIconType, setConfirmPasswordIconType] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formFields, setFormFields] = useState<any>({
    newPassword: {
      value: "",
      inputError: false,
    },
    confirmPassword: {
      value: "",
      inputError: false,
    },
  });

  useEffect(() => {
    verifyPwd(context);
  }, []);

  const verifyPwd = async (token: any) => {
    // try {
    //   const response: any = await verifyTempPwd(token);
    //   setUser(response);
    // } catch (error: any) {
    //   openErrorNotification(
    //     isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
    //   );
    //   history.push(urls.loginViewPath);
    // }
  };

  const handleOnChange = (event: React.ChangeEvent<any>) => {
    setFormFields({
      ...formFields,
      [event.target.name]: {
        ...formFields[event.target.name],
        value: event.target.value,
        inputError: event.target.value.replace(/\s/g, "").length <= 0,
      },
    });
  };

  const handleSubmitButton = () => {
    if (formFields.newPassword.value.length > 7) {
      if (formFields.newPassword.value === formFields.confirmPassword.value) {
        updatePassword();
      } else {
        setFormFields({
          ...formFields,
          confirmPassword: {
            value: formFields.confirmPassword.value,
            inputError: true,
          },
        });
      }
    } else {
      setFormFields({
        newPassword: {
          value: formFields.newPassword.value,
          inputError: true,
        },
        confirmPassword: {
          value: formFields.confirmPassword.value,
          inputError: true,
        },
      });
    }
  };

  const updatePassword = async () => {
    // try {
    //   setLoading(true);
    //   user.pwd = formFields.newPassword.value;
    //   const token = user.authToken;
    //   await activateUser(user, token);
    //   openSuccessNotification("Your password has been set successfully!");
    //   history.push(urls.loginViewPath);
    //   setLoading(false);
    // } catch (error: any) {
    //   setLoading(false);
    //   openErrorNotification(
    //     isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
    //   );
    //   history.push(urls.loginViewPath);
    // }
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitButton();
    }
  };

  const togglePassword = () => {
    if (newPasswordType === "password") {
      setNewPasswordType("text");
      setNewPasswordIconType(true);
      return;
    }
    setNewPasswordType("password");
    setNewPasswordIconType(false);
  };

  const toggleConfirmPassword = () => {
    if (confirmPasswordType === "password") {
      setConfirmPasswordType("text");
      setConfirmPasswordIconType(true);
      return;
    }
    setConfirmPasswordType("password");
    setConfirmPasswordIconType(false);
  };

  const getActivateUserScreen = () => {
    return (
      <Box>
        <Box>
          <Typography sx={classes.getHeading}>
            Set Password to Activate Your Account
          </Typography>
          <Grid container sx={classes.formCenter}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={classes.label}>
                <Typography sx={classes.labelText}>New Password</Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <BootstrapInput
                sx={
                  formFields.newPassword.inputError
                    ? classes.error
                    : classes.select
                }
                placeholder="Enter your new password"
                id="newPassword"
                type={newPasswordType}
                name="newPassword"
                value={formFields.newPassword.value}
                onChange={handleOnChange}
                onKeyPress={handleKeypress}
                endAdornment={
                  <Box onClick={togglePassword}>
                    {newPasswordIconType ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </Box>
                }
              />
              {formFields.newPassword.value.length < 8 &&
                formFields.newPassword.value.length > 0 && (
                  <FormHelperText error>
                    New password must be 8 character
                  </FormHelperText>
                )}
              {formFields.newPassword.value.length <= 0 &&
                formFields.newPassword.inputError && (
                  <FormHelperText error>
                    Please input your new password
                  </FormHelperText>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box sx={classes.label}>
                <Typography sx={classes.labelText}>Confirm Password</Typography>
                <Typography sx={classes.star}>*</Typography>
              </Box>
              <BootstrapInput
                sx={
                  formFields.confirmPassword.inputError
                    ? classes.error
                    : classes.select
                }
                placeholder="Enter your confirm password"
                id="confirmPassword"
                type={confirmPasswordType}
                name="confirmPassword"
                value={formFields.confirmPassword.value}
                onChange={handleOnChange}
                onKeyPress={handleKeypress}
                endAdornment={
                  <Box onClick={toggleConfirmPassword}>
                    {confirmPasswordIconType ? (
                      <RemoveRedEyeIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </Box>
                }
              />
              {formFields.confirmPassword.value !==
                formFields.newPassword.value &&
                formFields.confirmPassword.value.length > 0 && (
                  <FormHelperText error>
                    Confirm password doesn't match
                  </FormHelperText>
                )}
              {formFields.confirmPassword.value.length <= 0 &&
                formFields.confirmPassword.inputError && (
                  <FormHelperText error>
                    Please input your Confirm password
                  </FormHelperText>
                )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box marginTop={"10px"} width={"100%"}>
                <CustomButton
                  label="Submit"
                  onClick={handleSubmitButton}
                  loading={loading}
                  disabled={loading}
                  customClasses={classes.submitBtn}
                  id="active_user_button"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return getActivateUserScreen();
};

export default ActivateUser;
