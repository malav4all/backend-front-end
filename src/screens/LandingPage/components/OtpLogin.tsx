import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CustomButton, CustomInput } from "../../../global/components";
import loginStyles from "./Login.styles";
import {
  forgotPasswordValidation,
  forgotPasswordValue,
  otpVerifyValidation,
} from "./LoginTypesAndValidation";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import { mobileNumberExist, otpLogin, sendOtp } from "../landingPageService";
import history from "../../../utils/history";
import CustomLoader from "../../../global/components/CustomLoader/CustomLoader";
import { loginAction } from "../../../redux/authSlice";
import { useAppDispatch } from "../../../utils/hooks";

const OtpLogin = () => {
  const classes = loginStyles;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(30);
  const [showResend, setShowResend] = useState(false);
  const [disabledButton, setDisabledButton] = useState(false);
  const [formField, setFormField] = useState(forgotPasswordValue);

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
        const res = await otpLogin({ input: { mobileNumber, otp } });
        if (res?.verifyOtpLogin?.success === 1) {
          openSuccessNotification(res?.verifyOtpLogin?.message);
          dispatch(
            loginAction({
              email: res?.verifyOtpLogin?.data?.email,
              authenticated: true,
              accessToken: res?.verifyOtpLogin?.data?.accessToken,
              userName: res?.verifyOtpLogin?.data?.name,
              role: res?.verifyOtpLogin?.data?.role,
              resources: {},
              roleId: 1,
              account: res?.verifyOtpLogin?.data?.roleId?.name,
              accountId: res?.verifyOtpLogin?.data?.account?._id,
              userId: res?.verifyOtpLogin?.data?._id,
              roleName: res?.verifyOtpLogin?.data?.roleId?.name,
              tenantId: res?.verifyOtpLogin?.data?.account?.tenantId,
            })
          );
          history.push("/dashboard");
          openSuccessNotification(res?.verifyOtpLogin?.data?.name);
        } else {
          openErrorNotification(res?.verifyOtpLogin?.message);
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
    <Box sx={classes.getLoginScreen}>
      <Typography sx={classes.getHeading} mb={4}>
        Otp Login
      </Typography>
      <Box mx={4}>
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

        <Box mt={2}>
          <CustomButton
            label="Sign In"
            disabled={!disabledButton}
            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            customClasses={classes.signBtn}
            id="login_button"
          />
        </Box>
      </Box>
      <CustomLoader isLoading={loading} />
    </Box>
  );
};

export default OtpLogin;
