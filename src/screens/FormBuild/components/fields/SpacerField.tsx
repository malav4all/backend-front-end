import { useEffect } from "react";
import { LuSeparatorHorizontal } from "react-icons/lu";
import { Slider, Typography, Box } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ElementsType,
  FormElement,
  FormElementInstance,
} from "../FormElements";
import useDesigner from "../useDesigner";

const type: ElementsType = "SpacerField";

const extraAttributes = {
  height: 20, // px
};

const propertiesSchema = z.object({
  height: z.number().min(5).max(200),
});

export const SpacerFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: LuSeparatorHorizontal,
    label: "Spacer Field",
  },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: () => true,
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
  const { height } = element.extraAttributes;
  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={2}
      width="100%"
      alignItems="center"
    >
      <Typography variant="h6">Spacer field: {height}px</Typography>
      <LuSeparatorHorizontal className="h-8 w-8" />
    </Box>
  );
}

function FormComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { height } = element.extraAttributes;
  return <Box height={height} width="100%"></Box>;
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
      height: element.extraAttributes.height,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: PropertiesFormSchemaType) {
    const { height } = values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        height,
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
        name="height"
        control={form.control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Height (px): {form.watch("height")}</Typography>
            <Slider
              value={field.value}
              min={5}
              max={200}
              step={1}
              onChange={(e, value) => field.onChange(value)}
            />
          </Box>
        )}
      />
    </form>
  );
}
