import {
  Box,
  InputLabel,
  BaseTextFieldProps,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import {
  CountryIso2,
  defaultCountries,
  FlagEmoji,
  parseCountry,
  usePhoneInput,
} from "react-international-phone";
import customContactNumberStyles from "./ContactNumber.styles";
import { inputLabelRequiredColor } from "../../../utils/styles";

export interface MUIPhoneProps extends BaseTextFieldProps {
  label?: string;
  value: string;
  placeHolder?: string;
  error?: any;
  onChange: (phone: string) => void;
}

export const CustomContactNumberInput: React.FC<MUIPhoneProps> = ({
  label,
  value,
  placeHolder,
  error,
  onChange,
  required,
  ...restProps
}) => {
  const classes = customContactNumberStyles;

  const { phone, handlePhoneValueChange, inputRef, country, setCountry } =
    usePhoneInput({
      defaultCountry: "in",
      value,
      countries: defaultCountries,
      onChange: (data) => {
        onChange(data.phone);
      },
    });

  return (
    <>
      <Box mb={label ? 1 : 0}>
        <InputLabel sx={classes.nameField}>
          {label}
          {(required ?? false) && (
            <Box
              ml={0.4}
              sx={{
                color: inputLabelRequiredColor,
              }}
            >
              *
            </Box>
          )}
        </InputLabel>
      </Box>
      <TextField
        sx={classes.textField}
        variant="outlined"
        value={phone}
        placeholder={placeHolder}
        onChange={handlePhoneValueChange}
        type="tel"
        inputRef={inputRef}
        {...(error && { error: true, helperText: error })}
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              style={{
                marginRight: "2px",
                marginLeft: "-10px",
                marginTop: "8px",
              }}
            >
              <Select
                MenuProps={{
                  style: {
                    height: "300px",
                    width: "360px",
                    top: "10px",
                    left: "-34px",
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left",
                  },
                }}
                sx={{
                  // width: "max-content",
                  width: "60px",
                  // Remove default outline (display only on focus)
                  fieldset: {
                    display: "none",
                  },
                  '&.Mui-focused:has(div[aria-expanded="false"])': {
                    fieldset: {
                      display: "block",
                    },
                  },
                  // Update default spacing
                  ".MuiSelect-select": {
                    // padding: "8px",
                    paddingRight: "28px !important",
                    marginBottom: "4px",
                  },
                  svg: {
                    right: 0,
                    bottom: 2,
                    top: 9,
                  },
                }}
                value={country}
                onChange={(e) => setCountry(e.target.value as CountryIso2)}
                renderValue={(value) => <FlagEmoji iso2={value} />}
              >
                {defaultCountries.map((c) => {
                  const country = parseCountry(c);
                  return (
                    <MenuItem
                      key={country.iso2}
                      value={country.iso2}
                      style={{ gap: "10px" }}
                    >
                      <FlagEmoji
                        iso2={country.iso2}
                        style={{
                          marginRight: "8px",
                          height: "20px",
                          width: "20px",
                        }}
                      />
                      <Typography marginRight="8px">{country.name}</Typography>
                      <Typography color="gray">+{country.dialCode}</Typography>
                    </MenuItem>
                  );
                })}
              </Select>
            </InputAdornment>
          ),
        }}
        {...restProps}
      />
    </>
  );
};
