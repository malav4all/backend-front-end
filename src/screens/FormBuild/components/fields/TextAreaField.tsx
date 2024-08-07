import { useEffect, useState } from "react";
import { BsTextareaResize } from "react-icons/bs";
import {
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  Slider,
} from "@mui/material";
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

const type: ElementsType = "TextAreaField";

const extraAttributes = {
  label: "Text area",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
  rows: 3,
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  rows: z.number().min(1).max(10),
});

export const TextAreaFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: BsTextareaResize,
    label: "TextArea Field",
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
  const { label, required, placeHolder, helperText, rows } =
    element.extraAttributes;
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Typography variant="body2">
        {label}
        {required && "*"}
      </Typography>
      <TextField
        // readOnly
        disabled
        placeholder={placeHolder}
        multiline
        rows={rows}
      />
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
  const [value, setValue] = useState(defaultValue || "");
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText, rows } =
    element.extraAttributes;
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Typography variant="body2" color={error ? "error" : "initial"}>
        {label}
        {required && "*"}
      </Typography>
      <TextField
        placeholder={placeHolder}
        multiline
        rows={rows}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextAreaFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
        error={error}
      />
      {helperText && (
        <Typography variant="body2" color={error ? "error" : "textSecondary"}>
          {helperText}
        </Typography>
      )}
    </Box>
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
      placeHolder: element.extraAttributes.placeHolder,
      rows: element.extraAttributes.rows,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, rows } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required,
        rows,
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
        name="placeHolder"
        control={form.control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>PlaceHolder</Typography>
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
        name="rows"
        control={form.control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Rows {form.watch("rows")}</Typography>
            <Slider
              value={field.value}
              min={1}
              max={10}
              step={1}
              onChange={(e, value) => field.onChange(value)}
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
