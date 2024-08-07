import { IoMdCheckbox } from "react-icons/io";
import { Typography, Box, Checkbox } from "@mui/material";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
  label: "Checkbox field",
  helperText: "Helper text",
  required: false,
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
    <Box display="flex" alignItems="flex-start" gap={1}>
      <Checkbox disabled />
      <Box display="flex" flexDirection="column" gap={0.5}>
        <Typography>
          {label}
          {required && "*"}
        </Typography>
        {helperText && (
          <Typography variant="body2" color="textSecondary">
            {helperText}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

export default DesignerComponent;
