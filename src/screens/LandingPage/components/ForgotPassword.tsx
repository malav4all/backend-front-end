import { Grid, Typography, Box } from "@mui/material";
import { CustomButton, CustomInput } from "../../../global/components";
import history from "../../../utils/history";
import forgotPasswordStyles from "./ForgotPassword.styles";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import {
  forgotPasswordValidation,
  forgotPasswordValue,
  otpVerifyValidation,
} from "./LoginTypesAndValidation";
import strings from "../../../global/constants/StringConstants";
import { useTitle } from "../../../utils/UseTitle";
import React, { useState, useEffect } from "react";
import { mobileNumberExist, otpVerify, sendOtp } from "../landingPageService";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";

const ForgotPassword = () => {
  useTitle(strings.ForgotPasswordTitle);
  const classes = forgotPasswordStyles;
  const [formField, setFormField] = useState(forgotPasswordValue);
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (otpSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setShowResend(true);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpSent, timer]);

  const handleOnchange = (event: React.ChangeEvent<any>) => {
    setFormField({
      ...formField,
      [event.target.name]: {
        ...formField[event.target.name],
        value: event.target.value,
        error: "",
      },
    });
  };

  const handleSendOtp = async () => {
    if (handleValidationMobileNo()) {
      try {
        setLoading(true);
        const mobileNumber = Number(formField.mobileNumber.value);
        const success = await sendOtp({ input: { mobileNumber } });
        if (success?.sendOtp?.success === 1) {
          setOtpSent(true);
          setTimer(30);
          setShowResend(false);
          openSuccessNotification(success?.sendOtp?.message);
        } else {
          openErrorNotification("Failed to send OTP.");
        }
      } catch (error: any) {
        setLoading(false);
        openErrorNotification(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleVerifyOtp = async () => {
    if (handleValidationOtp()) {
      try {
        setLoading(true);
        const mobileNumber = Number(formField.mobileNumber.value);
        const otp = formField.otp.value;
        const success = await otpVerify({ input: { mobileNumber, otp } });
        if (success?.verifyOtp?.success === 1) {
          openSuccessNotification(success?.verifyOtp?.message);
          localStorage.setItem("email", success?.verifyOtp?.email);
          history.push("/changepwd");
        } else {
          openErrorNotification(success?.verifyOtp?.message);
        }
      } catch (error: any) {
        setLoading(false);
        openErrorNotification(error.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleValidationMobileNo = () => {
    const { isValid, errors } = forgotPasswordValidation(formField);
    setFormField({ ...errors });
    return isValid;
  };

  const handleValidationOtp = () => {
    const { isValid, errors } = otpVerifyValidation(formField);
    setFormField({ ...errors });
    return isValid;
  };

  const checkUserHandler = async () => {
    try {
      const mobileNumber = Number(formField.mobileNumber.value);
      const res = await mobileNumberExist({
        input: { mobileNumber },
      });
      if (res?.mobileNumberExists?.success === 1) {
        setDisabledButton(true);
      } else {
        openErrorNotification(res.mobileNumberExists.message);
        setDisabledButton(false);
      }
    } catch (error: any) {
      openErrorNotification(error.message);
    }
  };

  return (
    <Box>
      <Typography sx={classes.getHeading}>Reset Password</Typography>
      <Grid
        container
        sx={[classes.formCenter, { marginTop: "30px" }]}
        spacing={2}
        gap={5}
      >
        <Grid item xs={12}>
          <>
            <CustomInput
              label="Mobile Number"
              placeHolder="Enter your mobile number"
              id="mobileNumber"
              type="number"
              required
              name="mobileNumber"
              value={formField.mobileNumber.value}
              onChange={handleOnchange}
              disabled={otpSent}
              error={formField.mobileNumber.error}
              onBlur={checkUserHandler}
            />

            {otpSent && timer > 0 && (
              <Typography
                sx={{ position: "absolute", right: "50px" }}
                color={"red"}
              >
                00:{timer}
              </Typography>
            )}
            {otpSent && (
              <>
                <CustomInput
                  placeHolder="Enter OTP"
                  id="otp"
                  type="text"
                  name="otp"
                  label="OTP"
                  required
                  value={formField.otp.value}
                  onChange={handleOnchange}
                  error={formField.otp.error}
                />
                {showResend && (
                  <Box
                    sx={{
                      position: "absolute",
                      right: "50px",
                      top: "386px",
                      bottom: "0px",
                      cursor: "pointer",
                    }}
                    onClick={handleSendOtp}
                  >
                    Resend
                  </Box>
                )}
              </>
            )}
          </>

          <Box marginTop={2} width={"100%"}>
            <CustomButton
              onClick={otpSent ? handleVerifyOtp : handleSendOtp}
              label="Submit"
              disabled={!disabledButton}
              customClasses={classes.submitBtn}
              id="forgot_password_button"
            />
          </Box>
          <Box marginTop={2} width={"100%"}>
            <Typography
              onClick={() => history.push("/login")}
              sx={classes.submitBtn}
            >
              Back to Login
            </Typography>
          </Box>
        </Grid>
      </Grid>
      <CustomLoader isLoading={loading} />
    </Box>
  );
};

export default ForgotPassword;
