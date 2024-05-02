import { Box, InputLabel, SxProps, TextField } from "@mui/material";
import customInputStyles from "./CustomInput.styles";

interface CustomProps {
  label?: string;
  placeHolder?: string;
  value?: string;
  onChange?: any;
  type?: string;
  name?: string;
  select?: boolean;
  InputProps?: any;
  error?: any;
  required?: boolean;
  InputLabelProps?: any;
  id?: string;
  sx?: SxProps;
  disabled?: boolean;
  propsToInputElement?: any;
  onKeyPress?: any;
  onBlur?: any;
  maxLength?: number;
}

const CustomInput = (props: CustomProps) => {
  const classes = customInputStyles;
  const { error = null } = props;

  return (
    <Box>
      <Box mb={props.label ? 1 : 0}>
        <InputLabel required={props.required} sx={classes.nameField}>
          {props.label}
        </InputLabel>
      </Box>
      <TextField
        sx={classes.textField}
        variant="outlined"
        id={props.id}
        placeholder={props.placeHolder}
        type={props.type}
        name={props.name}
        select={props.select}
        value={props.value}
        InputProps={props.InputProps}
        onBlur={props.onBlur}
        inputProps={{
          maxLength: props?.maxLength,
          ...props?.propsToInputElement
        }}
        onChange={props.onChange}
        required={props.required}
        onKeyPress={props.onKeyPress}
        {...(error && { error: true, helperText: error })}
        disabled={props.disabled}
      />
    </Box>
  );
};

export default CustomInput;
