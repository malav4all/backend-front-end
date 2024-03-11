import {
  Autocomplete,
  Box,
  FormHelperText,
  SxProps,
  TextField,
} from "@mui/material";
import { isTruthy } from "../../../helpers/methods";
import CustomAutoCompleteStyles from "./CustomAutoComplete.styles";
export interface CustomProps {
  options: any;
  sx?: SxProps;
  id: string;
  placeHolder?: string;
  onChange: Function;
  errorMessage?: string;
  value: string;
  disabled?: boolean;
  name?: string;
  loading?: boolean;
  clearIcon?: boolean;
  filterOptions?: any;
  isFromMultipleBilling?: boolean;
}

const CustomAutoComplete = (props: CustomProps) => {
  const classes = CustomAutoCompleteStyles;
  const appliedClass = props.sx ? props.sx : classes.autoCompleteStylesStyle;
  return (
    <Box>
      <Autocomplete
        id={props.id}
        componentName={props.name}
        loading={props?.loading}
        sx={appliedClass}
        value={props.value}
        clearIcon={props.clearIcon}
        options={props.options}
        disabled={props.disabled}
        filterOptions={props.filterOptions}
        onChange={(event: any, newValue: any, index: any) =>
          props.onChange(event, newValue, index)
        }
        renderInput={(params: any) =>
          props.isFromMultipleBilling ? (
            <Box display={"flex"} justifyContent="center" alignItems="center">
              <Box component={"span"} sx={classes.birthdayBox}>
                {/* <img src={ClientIcon} alt="img" /> */}
              </Box>
              <TextField
                sx={classes.autocomplete}
                {...params}
                placeholder={props.placeHolder}
                error={isTruthy(props.errorMessage)}
              />
            </Box>
          ) : (
            <TextField
              sx={classes.autocomplete}
              {...params}
              placeholder={props.placeHolder}
              error={isTruthy(props.errorMessage)}
            />
          )
        }
      />
      {props.errorMessage && (
        <FormHelperText error sx={{ paddingLeft: "5px" }}>
          {props.errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomAutoComplete;
