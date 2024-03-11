import React, { useState } from "react";
import { Typography, Box, Grid, FormHelperText } from "@mui/material";
import { CustomButton } from "../../../global/components";
import { BootstrapInput } from "../../../utils/styles";
import ResetPasswordStyles from "./ResetPassword.styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import strings from "../../../global/constants/StringConstants";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";

import history from "../../../utils/history";
import { changePassword } from "../../Settings/Users/service/user.service";

const ResetPassword = React.forwardRef((props, ref: any) => {
  const classes = ResetPasswordStyles;
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
      if (
        formFields.newPassword.value === formFields.confirmPassword.value &&
        strings.passwordValidationRegex.test(formFields.newPassword.value) &&
        strings.passwordValidationRegex.test(formFields.confirmPassword.value)
      ) {
        updatePassword();
      } else {
        setFormFields({
          ...formFields,
          confirmPassword: {
            value: formFields.confirmPassword.value,
            inputError: true,
          },
          newPassword: {
            value: formFields.newPassword.value,
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
    try {
      setLoading(true);
      const getEmail = localStorage.getItem("email");
      const success = await changePassword({
        input: { email: getEmail, password: formFields.confirmPassword.value },
      });
      if (success?.changePassword?.success === 1) {
        openSuccessNotification(success?.changePassword?.message);
        localStorage.clear();
        history.push("/login");
      } else {
        openErrorNotification(success?.changePassword?.message);
      }
    } catch (error: any) {
      setLoading(false);
      openErrorNotification(error.message);
    } finally {
      setLoading(false);
    }
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

  const getResetPasswordPage = () => {
    return (
      <Box>
        <Box>
          <Typography sx={classes.getHeading}>Change Password</Typography>
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
              {!strings.passwordValidationRegex.test(
                formFields.newPassword.value
              ) &&
                formFields.newPassword.value?.length > 0 && (
                  <FormHelperText error>
                    Please enter a password that is at least 8 characters long
                    and includes at least one digit, one lowercase letter, one
                    uppercase letter, and one special character from the
                    following: @ $ ! % * ? & #
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
              {!strings.passwordValidationRegex.test(
                formFields.confirmPassword.value
              ) &&
                formFields.confirmPassword?.value?.length > 0 && (
                  <FormHelperText error style={{ paddingLeft: "6px" }}>
                    Please enter a password that is at least 8 characters long
                    and includes at least one digit, one lowercase letter, one
                    uppercase letter, and one special character from the
                    following: @ $ ! % * ? & #
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
                  id="reset_password_submit_button"
                />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  };

  return getResetPasswordPage();
});

export default ResetPassword;
