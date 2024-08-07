import { RiSeparator } from "react-icons/ri";
import { Typography, Box, Divider } from "@mui/material";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";

const type: ElementsType = "SeparatorField";

export const SeparatorFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes: {},
  }),
  designerBtnElement: {
    icon: RiSeparator,
    label: "Separator Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Typography variant="h6">Separator Field</Typography>
      <Divider />
    </Box>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <Divider />;
}

function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  return <Typography>No properties for this element</Typography>;
}
