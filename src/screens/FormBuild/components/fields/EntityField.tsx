import { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
  FormLabel as MuiFormLabel,
} from "@mui/material";
import { RxDropdownMenu } from "react-icons/rx";
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
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { fetchEntityTypeTableHandler } from "../../../Trip/EntityType/service/EntityType.service";
import { store } from "../../../../utils/store";
import { openErrorNotification } from "../../../../helpers/methods";

const type: ElementsType = "EntityField";

const extraAttributes = {
  label: "Entity field",
  helperText: "Helper text",
  required: false,
  placeHolder: "Value here...",
  options: [],
  entityType: "",
};

const propertiesSchema = z.object({
  label: z.string().min(2).max(50),
  helperText: z.string().max(200),
  required: z.boolean().default(false),
  placeHolder: z.string().max(50),
  options: z.array(z.string()).default([]),
  entityType: z.string().default(""),
});

export const EntityFieldFormElement: FormElement = {
  type,
  construct: (id: string) => ({
    id,
    type,
    extraAttributes,
  }),
  designerBtnElement: {
    icon: RxDropdownMenu,
    label: "Entity Field",
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

const useFetchEntityTypes = () => {
  const [entityTypes, setEntityTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTableEntityType = async () => {
      try {
        setLoading(true);
        const res = await fetchEntityTypeTableHandler({
          input: {
            accountId: store.getState().auth.tenantId,
            page: -1,
            limit: 1000,
          },
        });
        const finalData = res?.fetchEntityType?.data?.map((item: any) => ({
          accountId: item.accountId,
          name: item.name,
          description: item.description,
          createdBy: item.createdBy,
        }));
        setEntityTypes(finalData);
        setLoading(false);
      } catch (error: any) {
        openErrorNotification(error.message);
        setLoading(false);
      }
    };

    fetchTableEntityType();
  }, []);

  return { entityTypes, loading };
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
      <FormControl variant="outlined" fullWidth>
        <Select displayEmpty>
          <MenuItem value="">
            <em>{placeHolder}</em>
          </MenuItem>
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
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
  const { entityTypes, loading } = useFetchEntityTypes();

  useEffect(() => {
    setError(isInvalid === true);
  }, [isInvalid]);

  const { label, required, placeHolder, helperText } = element.extraAttributes;

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <MuiFormLabel error={error}>
        {label}
        {required && "*"}
      </MuiFormLabel>
      <FormControl variant="outlined" fullWidth error={error}>
        <Select
          value={value}
          onChange={(e) => {
            const newValue = e.target.value as string;
            setValue(newValue);
            if (!submitValue) return;
            const valid = EntityFieldFormElement.validate(element, newValue);
            setError(!valid);
            submitValue(element.id, newValue);
          }}
        >
          <MenuItem value="">
            <em>{placeHolder}</em>
          </MenuItem>
          {entityTypes.map((entity: any) => (
            <MenuItem key={entity.name} value={entity.name}>
              {entity.name}
            </MenuItem>
          ))}
        </Select>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </Box>
  );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  const element = elementInstance as CustomInstance;
  const { updateElement, setSelectedElement } = useDesigner();
  const { entityTypes } = useFetchEntityTypes();
  const form = useForm<propertiesFormSchemaType>({
    resolver: zodResolver(propertiesSchema),
    mode: "onSubmit",
    defaultValues: {
      label: element.extraAttributes.label,
      helperText: element.extraAttributes.helperText,
      required: element.extraAttributes.required,
      placeHolder: element.extraAttributes.placeHolder,
      options: element.extraAttributes.options,
      entityType: element.extraAttributes.entityType,
    },
  });

  useEffect(() => {
    form.reset(element.extraAttributes);
  }, [element, form]);

  function applyChanges(values: propertiesFormSchemaType) {
    const { label, helperText, placeHolder, required, options, entityType } =
      values;
    updateElement(element.id, {
      ...element,
      extraAttributes: {
        label,
        helperText,
        placeHolder,
        required,
        options,
        entityType,
      },
    });

    setSelectedElement(null);
  }

  return (
    <form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
      <Controller
        name="label"
        control={form.control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Label</Typography>
            <TextField
              {...field}
              onKeyDown={(e: any) =>
                e.key === "Enter" && e.currentTarget.blur()
              }
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
        name="entityType"
        control={form.control}
        render={({ field }) => (
          <Box display="flex" flexDirection="column" gap={1}>
            <Typography>Entity Type</Typography>
            <FormControl variant="outlined" fullWidth>
              <Select {...field}>
                <MenuItem value="">
                  <em>Select Entity Type</em>
                </MenuItem>
                {entityTypes.map((entity: any) => (
                  <MenuItem key={entity.name} value={entity.name}>
                    {entity.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}
      />
      <Box display="flex" flexDirection="column" gap={1}>
        <Typography>Options</Typography>
        <Box display="flex" flexDirection="column" gap={2}>
          {form.watch("options").map((option, index) => (
            <Box key={index} display="flex" alignItems="center" gap={1}>
              <TextField
                value={option}
                onChange={(e) => {
                  const newOptions = [...form.getValues("options")];
                  newOptions[index] = e.target.value;
                  form.setValue("options", newOptions);
                }}
              />
              <IconButton
                onClick={(e) => {
                  e.preventDefault();
                  const newOptions = [...form.getValues("options")];
                  newOptions.splice(index, 1);
                  form.setValue("options", newOptions);
                }}
              >
                <AiOutlineClose />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Button
          variant="outlined"
          onClick={(e: any) => {
            e.preventDefault();
            form.setValue("options", [
              ...form.getValues("options"),
              "New option",
            ]);
          }}
        >
          <AiOutlinePlus /> Add
        </Button>
      </Box>
      <Controller
        name="required"
        control={form.control}
        render={({ field }) => (
          <FormControlLabel control={<Switch {...field} />} label="Required" />
        )}
      />
      <Button variant="contained" fullWidth type="submit">
        Save
      </Button>
    </form>
  );
}

export default EntityFieldFormElement;
