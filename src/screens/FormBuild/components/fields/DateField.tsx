import { useEffect, useState } from "react";
import { BsFillCalendarDateFill } from "react-icons/bs";
import {
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Button,
  IconButton,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
  SubmitFunction,
} from "../FormElements";
import useDesigner from "../useDesigner";

const type: ElementsType = "DateField";

const extraAttributes = {
  label: "Date field",
  helperText: "Pick a date",
  required: false,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
});

export const DateFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsFillCalendarDateFill,
    label: "Date Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (
    formElement: FormElementInstance,
    currentValue: string
  ): boolean => {
    const element = formElement as CustomInstance;
    if (element.extraAttributes.required) {
      return currentValue.length > 0;
    }
    return true;
  },
};

type CustomInstance = FormElementInstance & {
  extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { label, required, helperText } = element.extraAttributes;
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Typography variant="body2">
        {label}
        {required && "*"}
      </Typography>
      <Button variant="outlined" startIcon={<BsFillCalendarDateFill />}>
        Pick a date
      </Button>
      {helperText && (
        <Typography variant="body2" color="textSecondary">
          {helperText}
        </Typography>
      )}
    </Box>
  );
}

function FormComponent({
  elementInstance,
  submitValue,
  isInvalid,
  defaultValue,
}: {
  elementInstance: FormElementInstance;
  submitValue?: SubmitFunction;
  isInvalid?: boolean;
  defaultValue?: string;
}) {
  const element = elementInstance as CustomInstance;
  const [date, setDate] = useState<Date | null>(
    defaultValue ? new Date(defaultValue) : null
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, helperText } = element.extraAttributes;

  const handleDateChange = (newDate: Date | null) => {
    setDate(newDate);
    if (!submitValue) return;
    const value = newDate?.toISOString() || "";
    const valid = DateFieldFormElement.validate(element, value);
    setError(!valid);
    submitValue(element.id, value);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <Typography variant="body2" color={error ? "error" : "initial"}>
          {label}
          {required && "*"}
        </Typography>
        <DatePicker
          value={date}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              variant: "outlined",
              fullWidth: true,
              error: error,
              helperText: helperText,
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}

type PropertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement } = useDesigner();
  const form = useForm<PropertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onBlur",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { label, helperText, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        required,
      },
    });
  }

  return (
    <form
      onBlur={form.handleSubmit(applyChanges)}
      onSubmit={(e) => e.preventDefault()}
      className="space-y-3"
    >
      <Controller
        name="label"
        control={form.control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Label</Typography>
            <TextField
              {...field}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            />
          </Box>
        )}
      />
      <Controller
        name="helperText"
        control={form.control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Helper text</Typography>
            <TextField
              {...field}
              onKeyDown={(e) => e.key === "Enter" && e.currentTarget.blur()}
            />
          </Box>
        )}
      />
      <Controller
        name="required"
        control={form.control}
        render={({ field }) => (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={1}
            border={1}
            borderRadius={1}
          >
            <Box>
              <Typography>Required</Typography>
              <Typography variant="body2" color="textSecondary">
                The field is required.
              </Typography>
            </Box>
            <Switch
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
            />
          </Box>
        )}
      />
    </form>
  );
}

export default DateFieldFormElement;
