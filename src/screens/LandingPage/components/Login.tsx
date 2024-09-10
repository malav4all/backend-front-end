import React, { useEffect, useState } from "react";
import { IconButton, InputAdornment, useMediaQuery } from "@mui/material";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../helpers/methods";
import notifiers from "../../../global/constants/NotificationConstants";
import { useAppDispatch } from "../../../utils/hooks";
import { loginAction } from "../../../redux/authSlice";
import history from "../../../utils/history";
import { theme } from "../../../utils/styles";
import { loginForm, loginValidation } from "./LoginTypesAndValidation";
import strings from "../../../global/constants/StringConstants";
import hidePasswordIcon from "../../../assets/images/Hide.svg";
import showPasswordIcon from "../../../assets/images/Show.svg";
import { useTitle } from "../../../utils/UseTitle";
import _ from "lodash";
import { onLogin } from "../landingPageService";

const Login = () => {
  useTitle(strings.LoginTitle);
  const emailRegex = strings.regex;
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [formFields, setFormFields] = useState(loginForm);
  const [showPassword, setShowPassword] = useState(false);
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

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

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
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
          const formattedResources =
            user?.loginUser?.data?.data?.user?.roleId?.resources;
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
              resources: formattedResources,
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

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleValidation = () => {
    const { isValid, errors } = loginValidation(formFields);
    setFormFields({ ...errors });
    return isValid;
  };

  return (
    <div className="flex flex-wrap">
      <div className="flex w-full flex-col">
        <div className="lg:w-[22rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:pt-0">
          <p className="text-left text-2xl md:text-3xl font-bold">Login</p>
          <p className="mt-2 text-left text-sm md:text-base text-gray-500">
            Please enter your login details.
          </p>

          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleLogin}>
            <div className="flex flex-col pt-4 ">
              <div className=" focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="email"
                  id="login-email"
                  className="w-full  flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Email"
                  name="email"
                  value={formFields.email.value}
                  onChange={handleOnChangeInputField}
                  required
                />
              </div>
            </div>

            <div className="mb-12 flex flex-col pt-4">
              <div className="relative flex items-center border-b-2 border-gray-300 focus-within:border-b-gray-500 transition">
                <input
                  type={showPassword ? "text" : "password"}
                  id="login-password"
                  className="w-full appearance-none bg-white px-4 py-2 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                  name="password"
                  value={formFields.password.value}
                  onChange={handleOnChangeInputField}
                  required
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    className="focus:outline-none"
                  >
                    <img
                      src={showPassword ? showPasswordIcon : hidePasswordIcon}
                      alt="toggle password visibility"
                      className="h-5 w-5"
                    />
                  </IconButton>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#5F22E1] px-4 py-2 text-center text-sm md:text-base font-semibold text-white ring-gray-500 ring-offset-2 transition focus:ring-2"
              disabled={
                _.isEmpty(formFields.email.value) ||
                _.isEmpty(formFields.password.value) ||
                !emailRegex.test(formFields.email.value) ||
                formFields.password?.value?.length < 8
              }
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Login);
