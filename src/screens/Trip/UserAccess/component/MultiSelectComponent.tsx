import React from "react";
import {
  Autocomplete,
  Checkbox,
  TextField,
  Box,
  InputLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const MultiSelectAutocomplete = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
  optionKey,
  icon,
  checkedIcon,
}: any) => {
  const theme = useTheme();

  const handleSelectAll = (event: any) => {
    if (event.target.checked) {
      const allOptions = options.map((option: any) => option[optionKey]);
      setSelectedOptions(allOptions);
    } else {
      setSelectedOptions([]);
    }
  };

  const handleChange = (event: any, value: any) => {
    const filteredValues = value.filter((v: any) => typeof v !== "string");
    const selectedNames = filteredValues.map(
      (option: any) => option[optionKey]
    );
    setSelectedOptions(selectedNames);
  };

  const isOptionSelected = (option: any) => {
    return selectedOptions.includes(option[optionKey]);
  };

  return (
    <Box>
      <InputLabel sx={{ color: theme.palette.text.primary }} shrink>
        {label}
      </InputLabel>
      <Autocomplete
        multiple
        id="checkboxes-tags-demo"
        options={["Select All", ...options]}
        disableCloseOnSelect
        getOptionLabel={(option) =>
          typeof option === "string" ? option : option[optionKey]
        }
        value={selectedOptions.map((item: any) =>
          options.find((option: any) => option[optionKey] === item)
        )}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderRadius: "5px",
        }}
        onChange={handleChange}
        placeholder={`Enter ${label}`}
        renderOption={(props, option, { selected }) => {
          if (typeof option === "string") {
            return (
              <li {...props}>
                <Checkbox
                  icon={icon}
                  checkedIcon={checkedIcon}
                  style={{ marginRight: 8 }}
                  checked={selectedOptions.length === options.length}
                  onChange={handleSelectAll}
                />
                Select All
              </li>
            );
          }
          return (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={isOptionSelected(option)}
              />
              {option[optionKey]}
            </li>
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={selectedOptions.length === 0 ? `Select ${label}` : ""}
          />
        )}
      />
    </Box>
  );
};

export default MultiSelectAutocomplete;
