import React, { useState } from "react";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import { User } from "../../../models/interfaces";
import registerStyles from "./Register.styles";
import {
  CustomButton,
  CustomContactNumberInput,
  CustomInput,
} from "../../../global/components";
import { isTruthy, openErrorNotification } from "../../../helpers/methods";
import history from "../../../utils/history";
// import urls from "../../../global/constants/UrlConstants";
// import { createNewAccount } from "../landingPageService";
import strings from "../../../global/constants/StringConstants";
import {
  registerFormField,
  registrationValidation,
} from "./LoginTypesAndValidation";
import { useLocation } from "react-router-dom";
import notifiers from "../../../global/constants/NotificationConstants";
import hidePasswordIcon from "../../../assets/images/Hide.svg";
import showPasswordIcon from "../../../assets/images/Show.svg";
import { useTitle } from "../../../utils/UseTitle";

const Register = React.forwardRef((props, ref: any) => {
  useTitle(strings.CreateAccountTitle);
  const classes = registerStyles;
  const [formFields, setFormFields] = useState(registerFormField);
  const [showPassword, setSetPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const planIdFromURL = new URLSearchParams(useLocation().search).get("id");

  const handleOnchange = (event: React.ChangeEvent<any>) => {
    setFormFields({
      ...formFields,
      [event.target.name]: {
        ...formFields[event.target.name],
        value: event.target.value,
        error: "",
      },
    });
  };

  const createAccount = async (userData: User) => {
    // try {
    //   let token = "";
    //   if (urls.PROD) {
    //     token = await ref.current?.executeAsync();
    //   }
    //   setLoading(true);
    //   ref.current && ref.current.reset();
    //   userData.captchaToken = token;
    //   await createNewAccount(userData);
    //   setLoading(false);
    // } catch (error: any) {
    //   setLoading(false);
    //   throw error;
    // }
  };

  const submitButton = () => {
    return (
      <Box sx={classes.centerBotton} alignItems={"center"}>
        <CustomButton
          label={"Create Account"}
          onClick={handleSubmitButton}
          loading={loading}
          disabled={loading}
          customClasses={classes.signBtn}
          id="register_submit_button"
        />
      </Box>
    );
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmitButton();
    }
  };

  const handleSubmitButton = async () => {
    try {
      if (handleValidation()) {
        const userData: User = {
          pwd: formFields.password?.value,
          authToken: "",
          name: formFields.firstName?.value + " " + formFields.lastName?.value,
          contactNo: formFields.contact?.value,
          email: formFields.email?.value,
          role: "",
          resources: [],
          account: formFields.company?.value,
          company: formFields.company?.value,
          captchaToken: "",
          planId: "089cc9f7f4de4023a870717f52364f63",
        };
        await createAccount(userData);
        // history.push(urls.registrationSuccessViewPath);
      }
    } catch (error: any) {
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };

  const logInPage = () => {
    // history.push(urls.loginViewPath);
  };

  const handleValidation = () => {
    const { errors, isValid } = registrationValidation(formFields);
    setFormFields({ ...errors });
    return isValid;
  };

  const getForm = () => {
    return (
      <Grid container spacing={1} sx={{ px: 4 }}>
        <Grid item xs={12} sm={6} md={6} xl={6} lg={6}>
          <CustomInput
            label="First Name"
            required
            placeHolder="Enter your first name"
            type="text"
            name="firstName"
            id="firstName"
            value={formFields.firstName.value}
            propsToInputElement={{ maxlength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>{formFields.firstName.value.length} / 20</span>
                </InputAdornment>
              ),
            }}
            onChange={handleOnchange}
            onKeyPress={handleKeypress}
            error={
              isTruthy(formFields.firstName.error) && formFields.firstName.error
            }
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} xl={6} lg={6}>
          <CustomInput
            label="Last Name"
            required
            id="lastName"
            placeHolder="Enter your last name"
            type="text"
            name="lastName"
            value={formFields.lastName.value}
            propsToInputElement={{ maxlength: 20 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>{formFields.lastName.value.length} / 20</span>
                </InputAdornment>
              ),
            }}
            onChange={handleOnchange}
            onKeyPress={handleKeypress}
            error={
              isTruthy(formFields.lastName.error) && formFields.lastName.error
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
          <CustomInput
            label="Company Name"
            required
            id="companyName"
            placeHolder="Enter your company name"
            type="text"
            name="company"
            value={formFields.company.value}
            propsToInputElement={{ maxlength: 25 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>{formFields.company.value.length} / 25</span>
                </InputAdornment>
              ),
            }}
            onChange={handleOnchange}
            onKeyPress={handleKeypress}
            error={
              isTruthy(formFields.company.error) && formFields.company.error
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
          <CustomContactNumberInput
            label="Contact Number"
            required
            id="contactNumber"
            value={formFields.contact?.value}
            placeHolder="Enter Your Contact No"
            onChange={(phone: any) => {
              setFormFields({
                ...formFields,
                contact: {
                  value: phone,
                  error: "",
                },
              });
            }}
            error={
              isTruthy(formFields.contact.error) && formFields.contact.error
            }
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
          <CustomInput
            label="Email"
            required
            id="email"
            placeHolder="Enter your email"
            type="email"
            name="email"
            value={formFields.email.value}
            propsToInputElement={{ maxlength: 45 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <span>{formFields.email.value.length} / 45 </span>
                </InputAdornment>
              ),
            }}
            onChange={handleOnchange}
            onKeyPress={handleKeypress}
            error={isTruthy(formFields.email.error) && formFields.email.error}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomInput
            label="Password"
            required
            placeHolder="••••••••"
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formFields.password.value}
            onChange={handleOnchange}
            onKeyPress={handleKeypress}
            error={
              isTruthy(formFields.password.error) && formFields.password.error
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setSetPassword(!showPassword)}
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
        <Grid item xs={12} sm={12} md={12} xl={12} lg={12}>
          {submitButton()}
        </Grid>
      </Grid>
    );
  };

  const getRegisterPage = () => {
    return (
      <Box sx={classes.registerPage}>
        <Typography sx={classes.getHeading}>Create Account</Typography>
        <Typography sx={classes.alreadyAccount}>
          Already have an account?
          <Box
            ml={0.5}
            component={"span"}
            color={"#0352B5"}
            sx={{ fontWeight: "bold", cursor: "pointer" }}
            onClick={logInPage}
            id="back_login_screen"
          >
            Login
          </Box>
        </Typography>
        {getForm()}
      </Box>
    );
  };

  return getRegisterPage();
});

export default Register;
