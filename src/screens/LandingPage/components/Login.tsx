import React, { useEffect, useState } from "react";
import {
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  convertResourceToObjectFormat,
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import notifiers from "../../../global/constants/NotificationConstants";
import { useAppDispatch } from "../../../utils/hooks";
import loginStyles from "./Login.styles";
import { loginAction } from "../../../redux/authSlice";
import history from "../../../utils/history";
import { regularFont, theme } from "../../../utils/styles";
import { CustomButton, CustomInput } from "../../../global/components";
import { loginForm, loginValidation } from "./LoginTypesAndValidation";
import strings from "../../../global/constants/StringConstants";
import hidePasswordIcon from "../../../assets/images/Hide.svg";
import showPasswordIcon from "../../../assets/images/Show.svg";
import { useTitle } from "../../../utils/UseTitle";
import _ from "lodash";
import { changeStatus, onLogin } from "../landingPageService";

const loginType: any = {
  ["login"]: {
    label: "Login",
    key: "login",
  },
  ["Otp"]: {
    key: "otp",
    label: "OTP Login",
  },
};

const Login = () => {
  useTitle(strings.LoginTitle);
  const classes = loginStyles;
  const emailRegex = strings.regex;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState(loginForm);
  const [showPassword, setShowPassword] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [loginTypeTab, setLoginTypeTab] = useState("login");

  useEffect(() => {
    const host = window.location.hostname;
    if (host.includes("demo")) {
      setFormFields({
        email: {
          value: "imz.demo@imzcorporate.com",
          error: "",
        },
        password: {
          value: "ssmaildemo@1234",
          error: "",
        },
      });
    }
  }, []);

  const handleOnChangeInputField = (event: React.ChangeEvent<any>) => {
    const trimmedValue = event.target.value.trimStart(); // Trim spaces from the start
    setFormFields({
      ...formFields,
      [event.target.name]: {
        ...formFields[event.target.name],
        value: trimmedValue,
      },
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      if (handleValidation()) {
        const email = formFields.email.value.trim().toLowerCase(); // Trim spaces before submission
        const password = formFields.password.value.trim(); // Trim spaces before submission
        const user: any = await onLogin({ input: { email, password } });
        if (user?.loginUser?.data?.success === 0) {
          openErrorNotification(user?.loginUser?.data?.message);
          setIsLoading(false);
        } else {
          const formattedResources = convertResourceToObjectFormat(
            user?.loginUser?.data?.data?.user.roleId.resources
          );
          dispatch(
            loginAction({
              email,
              authenticated: true,
              accessToken: user?.loginUser?.data?.data?.user.accessToken,
              isSuperAdmin: user?.loginUser?.data?.data?.user.isSuperAdmin,
              isAccountAdmin: user?.loginUser?.data?.data?.user.isAccountAdmin,
              imeiList: user?.loginUser?.data?.data?.user.imeiList,
              deviceGroup: user?.loginUser?.data?.data?.user.deviceGroup,
              userName: user?.loginUser?.data?.data?.user.name,
              role: user?.loginUser?.data?.data?.user?.roleId.name,
              resources: {},
              roleId: user?.loginUser?.data?.data?.user.roleId._id,
              userId: user?.loginUser?.data?.data?.user?._id,
              account: user?.loginUser?.data?.data?.user?.account?.accountName,
              accountId: user?.loginUser?.data?.data?.user?.account?._id,
              accountContactMobile:
                user?.loginUser?.data?.data?.user?.account
                  ?.accountContactMobile,
              roleName: user?.loginUser?.data?.data?.user.roleId.name,
              tenantId:
                user?.loginUser?.data?.data?.user?.account?.tenantId || "",
              sidebar: user?.loginUser?.data?.data?.user.sidebar,
            })
          );
          setIsLoading(false);
          history.push("/dashboard");
          openSuccessNotification(user?.loginUser?.data?.message);
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.LOGIN_ERROR
      );
    }
  };

  const forgetPassword = () => {
    history.push("/forgot-password");
  };

  const handleClickShowPassword = () => {
    setShowPassword(showPassword);
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleLogin();
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setShowPassword(!showPassword);
    event.preventDefault();
  };

  const handleValidation = () => {
    const { isValid, errors } = loginValidation(formFields);
    setFormFields({ ...errors });
    return isValid;
  };

  const getLoginScreen = () => {
    return (
      <Box sx={classes.getLoginScreen}>
        <Box mx={2}>
          <Box my={1}>
            <CustomInput
              placeHolder="Enter Email Address"
              id="email"
              label="Email"
              required
              type="email"
              name="email"
              value={formFields.email.value}
              onChange={handleOnChangeInputField}
              onKeyPress={handleKeypress}
              error={
                !isTruthy(formFields.email.value) && formFields.email.error
              }
            />
          </Box>

          <Box>
            <CustomInput
              sx={classes.textRadious}
              placeHolder="••••••••"
              id="password"
              required
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formFields.password.value}
              onChange={handleOnChangeInputField}
              onKeyPress={handleKeypress}
              error={
                !isTruthy(formFields.password.value) &&
                formFields.password.error
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
          </Box>

          <Box sx={classes.forgetPasswordWrapper}>
            <Typography
              sx={{
                textDecoration: "none",
                ...regularFont,
                color: "black",
                cursor: "pointer",
                fontSize: "12px",
                marginTop: "-0.8rem",
              }}
              onClick={forgetPassword}
            >
              Forgot Password
            </Typography>
          </Box>

          <Box mt={4}>
            <CustomButton
              label="Sign In"
              onClick={handleLogin}
              disabled={
                _.isEmpty(formFields.email.value) ||
                _.isEmpty(formFields.password.value) ||
                !emailRegex.test(formFields.email.value) ||
                formFields.password?.value?.length < 8
              }
              // loading={isLoading}
              customClasses={classes.signBtn}
              id="login_button"
            />
          </Box>
        </Box>
      </Box>
    );
  };

  const screenHandler = () => {
    switch (loginTypeTab) {
      case "login":
        return getLoginScreen();
    }
  };

  return <Box>{screenHandler()}</Box>;
};

export default React.memo(Login);
