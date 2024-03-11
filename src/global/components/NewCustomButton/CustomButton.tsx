import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import customButtonStyles from "./CustomButton.styles";

interface CustomProps {
  id: string;
  label?: string | JSX.Element;
  onClick: Function;
  loading?: boolean;
  customClasses?: any;
  icon?: JSX.Element;
  disabled?: boolean;
}

const NewCustomButton = (props: CustomProps) => {
  const classes = customButtonStyles;
  const appliedClass = props.customClasses;

  const processing = props.loading ? props.loading : false;
  const disabled = props.disabled ? props.disabled : false;

  return (
    <Button
      {...(props.id && { id: props.id })}
      startIcon={props.icon}
      sx={
        props.customClasses
          ? [classes.btnStyle, props.customClasses]
          : classes.btnStyle
      }
      onClick={(event: any) => props.onClick(event)}
      disabled={processing || disabled}
    >
      {processing ? (
        <CircularProgress sx={classes.loadingStyle} />
      ) : (
        props.label
      )}
    </Button>
  );
};

export default NewCustomButton;
