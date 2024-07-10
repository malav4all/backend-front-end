import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  TextField,
  Typography,
  Select,
  MenuItem,
  InputLabel,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { Form, FormField } from "./FormBuilderHelper";
import FormBuilder from "./FormBuilder";
import FormList from "./FormList";
import {
  CustomAppHeader,
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../global/components";
import {
  boldFont,
  headerColor,
  primaryHeadingColor,
  getRelativeFontSize,
} from "../../utils/styles";
import formBuilderStyles from "./FormBuilderPage.styles";
import { useTheme } from "@mui/material";
import {
  openErrorNotification,
  openSuccessNotification,
} from "../../helpers/methods";
import { addFormBuilder } from "./service/form-builder.service";

const journeys = [
  { _id: "1", journeyName: "Journey 1" },
  { _id: "2", journeyName: "Journey 2" },
  { _id: "3", journeyName: "Journey 3" },
];

const FormBuilderPage: React.FC = () => {
  const theme = useTheme();
  const classes = formBuilderStyles;
  const [forms, setForms] = useState<Form[]>([]);
  const [formTitle, setFormTitle] = useState("");
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [booleanValues, setBooleanValues] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    setForms([]);
  }, []);

  const saveForm = async () => {
    try {
      const newForm: Form = {
        id: uuidv4(),
        title: formTitle,
        fields: formFields,
        enabled: true,
      };
      const res = await addFormBuilder({
        input: {
          accountId: "IMZ113343",
          formTitle: formTitle,
          fields: formFields,
          isFormEnable: true,
          createdBy: "Malav",
        },
      });
      openSuccessNotification(res.addFormBuilder.message);
      setForms([...forms, newForm]);
      setFormTitle("");
      setFormFields([]);
    } catch (error) {
      openErrorNotification(error);
    }
  };

  const handleViewForm = (form: Form) => {
    setSelectedForm(form);
    const initialBooleanValues = form.fields
      .filter((field) => field.type === "boolean")
      .reduce((acc, field) => ({ ...acc, [field.id]: false }), {});
    setBooleanValues(initialBooleanValues);
    setIsDialogOpen(true);
  };

  const handleDeleteForm = (formId: string) => {
    setForms(forms.filter((form) => form.id !== formId));
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setSelectedForm(null);
  };

  const handleBooleanChange =
    (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setBooleanValues((prevValues) => ({
        ...prevValues,
        [id]: event.target.checked,
      }));
    };

  const handleToggleEnable = (formId: string) => {
    setForms(
      forms.map((form) =>
        form.id === formId ? { ...form, enabled: !form.enabled } : form
      )
    );
  };

  const getHeader = () => {
    return (
      <Box>
        <Typography sx={{ ...classes.mainCardHeading, color: "white" }}>
          Form Builder
        </Typography>
      </Box>
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        height: "100%",
      }}
    >
      <CustomAppHeader
        className={{
          backgroundColor: headerColor,
          padding: "10px 20px 15px 18px",
        }}
      >
        <Stack
          px={4}
          pt={2}
          direction={{ lg: "row", xs: "column" }}
          justifyContent="space-between"
          alignItems={{ lg: "center" }}
        >
          <Typography
            sx={{
              fontSize: getRelativeFontSize(6),
              ...boldFont,
              color: primaryHeadingColor,
            }}
          >
            {getHeader()}
          </Typography>
        </Stack>
      </CustomAppHeader>

      <Box
        sx={{
          width: "1000px",
          margin: "auto",
          padding: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <TextField
            label="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ marginRight: 2 }}
          />
          <CustomButton label="SAVE FORM" onClick={saveForm} />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1, marginRight: "1rem" }}>
            <FormBuilder onFieldsChange={setFormFields} />
          </Box>
          <Box sx={{ flex: 1, marginLeft: "1rem" }}>
            <FormList
              forms={forms}
              onViewForm={handleViewForm}
              onDeleteForm={handleDeleteForm}
              onToggleEnable={handleToggleEnable}
            />
          </Box>
        </Box>
      </Box>

      <CustomDialog
        isDialogOpen={isDialogOpen}
        handleDialogClose={handleCloseDialog}
        dialogTitleContent={<Typography variant="h6">View Form</Typography>}
        dialogBodyContent={
          selectedForm ? (
            <Box component="form" sx={{ mt: 2 }}>
              <Typography variant="h6" sx={{ mb: 5 }}>
                Title: {selectedForm.title}
              </Typography>
              {selectedForm.fields.map((field) => (
                <Box key={field.id} sx={{ mb: 2 }}>
                  {field.type === "text" && (
                    <CustomInput
                      type="text"
                      label={field.label}
                      placeHolder={`Enter ${field.label}`}
                    />
                  )}
                  {field.type === "email" && (
                    <CustomInput
                      type="email"
                      label={field.label}
                      placeHolder={`Enter ${field.label}`}
                    />
                  )}
                  {field.type === "number" && (
                    <CustomInput
                      type="number"
                      label={field.label}
                      placeHolder={`Enter ${field.label}`}
                    />
                  )}
                  {field.type === "select" && (
                    <Box>
                      <InputLabel>{field.label}</InputLabel>
                      <Select
                        label={field.label}
                        value=""
                        onChange={() => {}}
                        displayEmpty
                        sx={{ width: "100%" }}
                      >
                        {journeys.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
                            {item.journeyName}
                          </MenuItem>
                        ))}
                      </Select>
                    </Box>
                  )}
                  {field.type === "boolean" && (
                    <FormControlLabel
                      control={
                        <Switch
                          checked={booleanValues[field.id] || false}
                          onChange={handleBooleanChange(field.id)}
                          color="primary"
                        />
                      }
                      label={field.label}
                    />
                  )}
                </Box>
              ))}
            </Box>
          ) : (
            <Typography>No form selected</Typography>
          )
        }
        dialogFooterContent={
          <CustomButton
            label="Close"
            onClick={handleCloseDialog}
            customClasses={{ backgroundColor: "#003366", color: "white" }}
          />
        }
      />
    </Box>
  );
};

export default FormBuilderPage;
