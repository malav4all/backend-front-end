import React, { ChangeEvent } from "react";
import {
  Grid,
  Box,
  Typography,
  TextField,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { LocalizationProvider, DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useTheme } from "@mui/material";
import { CustomInput } from "../../../../../global/components";

interface DynamicFormProps {
  dynamicForm: any;
  handleInputChange: any;
  formData: any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  dynamicForm,
  handleInputChange,
  formData,
}) => {
  const theme = useTheme();
  const renderDynamicFormFields = (form: any) => {
    return form?.content?.map((field: any) => (
      <Grid
        item
        xs={12}
        sm={6}
        md={6}
        lg={6}
        xl={6}
        key={field.id}
        sx={{ marginBottom: "16px" }}
      >
        <InputLabel
          style={{
            display: "flex",
            fontSize: "18px",
            color: theme.palette.text.primary,
            fontWeight: 600,
          }}
          shrink
        >
          {field?.extraAttributes?.label}
          {field?.extraAttributes?.required && (
            <Box ml={0.4} style={{ color: "red" }}>
              *
            </Box>
          )}
        </InputLabel>

        {field?.type === "TextField" && (
          <CustomInput
            placeHolder={field?.extraAttributes?.placeHolder}
            name={field?.extraAttributes?.label}
            onChange={handleInputChange}
            value={
              formData?.[field.id]?.value || field?.extraAttributes?.value || ""
            }
          />
        )}
        {field?.type === "NumberField" && (
          <CustomInput
            type="number"
            placeHolder={field?.extraAttributes?.placeHolder}
            name={field?.extraAttributes?.label}
            onChange={handleInputChange}
            value={
              formData?.[field.id]?.value || field?.extraAttributes?.value || ""
            }
          />
        )}
        {(field?.type === "SelectField" ||
          field?.type === "TripField" ||
          field?.type === "EntityField") && (
          <Select
            name={field?.extraAttributes?.label}
            value={
              formData?.[field.id]?.value || field?.extraAttributes?.value || ""
            }
            onChange={handleInputChange}
            displayEmpty
            fullWidth
          >
            {field?.extraAttributes?.options?.map((option: any, index: any) => (
              <MenuItem key={index} value={option?.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
        {field?.type === "DateField" && (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              value={
                formData?.[field.id]?.value ||
                field?.extraAttributes?.value ||
                null
              }
              onChange={(newValue) =>
                handleInputChange({
                  target: {
                    name: field?.extraAttributes?.label,
                    value: newValue?.toISOString(),
                  },
                })
              }
              slotProps={{
                textField: {
                  placeholder: field?.extraAttributes?.placeHolder,
                  required: field?.extraAttributes?.required,
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        )}
      </Grid>
    ));
  };

  return (
    <Grid container spacing={2} padding={5}>
      {dynamicForm?.map((form: any, index: any) => (
        <React.Fragment key={index}>
          {renderDynamicFormFields(form)}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default DynamicForm;
