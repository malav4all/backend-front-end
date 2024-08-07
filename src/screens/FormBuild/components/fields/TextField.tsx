import { useEffect, useState } from "react";
import { MdTextFields } from "react-icons/md";
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

const type: ElementsType = "TextField";

const extraAttributes = {
  label: "Text field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
});

export const TextFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: MdTextFields,
    label: "Text Field",
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
  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Typography>
        {label}
        {required && "*"}
      </Typography>
      <TextField variant="outlined" disabled placeholder={placeHolder} />
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

  const { label, required, placeHolder, helperText } = element.extraAttributes;
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Typography color={error ? "error" : "textPrimary"}>
        {label}
        {required && "*"}
      </Typography>
      <TextField
        variant="outlined"
        error={error}
        placeholder={placeHolder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={(e) => {
          if (!submitValue) return;
          const valid = TextFieldFormElement.validate(element, e.target.value);
          setError(!valid);
          if (!valid) return;
          submitValue(element.id, e.target.value);
        }}
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
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { label, helperText, placeHolder, required } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
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
            <Typography variant="body2" color="textSecondary">
              The label of the field. It will be displayed above the field.
            </Typography>
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
            <Typography variant="body2" color="textSecondary">
              The placeholder of the field.
            </Typography>
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
            <Typography variant="body2" color="textSecondary">
              The helper text of the field. It will be displayed below the
              field.
            </Typography>
          </Box>
        )}
      />
      <Controller
        name="required"
        control={form.control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch checked={field.value} onChange={field.onChange} />}
            label="Required"
            labelPlacement="end"
          />
        )}
      />
    </form>
  );
}
