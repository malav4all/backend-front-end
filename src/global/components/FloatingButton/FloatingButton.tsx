import { Button, CircularProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { convertPriceToDollarFormat } from "../../../helpers/methods";
import floatButtonStyles from "./FloatButton.styles";

interface CustomProps {
  label: string;
  onClick: Function;
  noOfItems?: number;
  price?: number;
  loading?: boolean;
  customClasses?: string;
}

const FloatingButton = (props: CustomProps) => {
  const classes = floatButtonStyles();
  const appliedClass = props.customClasses
    ? props.customClasses
    : classes.btnStyle;
  const processing = props.loading ? props.loading : false;

  const getFloatingButton = () => {
    return (
      <Box className={classes.floatingBtn}>
        <Button
          className={appliedClass}
          onClick={() => props.onClick()}
          disabled={processing}
        >
          {processing ? (
            <Box className={classes.loading}>
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Typography className={classes.noOfItems}>
                {props.noOfItems &&
                  props.noOfItems.toString() +
                    (props.noOfItems > 1 ? " items" : " item")}
              </Typography>
              <Typography className={classes.label}>{props.label}</Typography>
              <Typography className={classes.price}>
                {props.price && convertPriceToDollarFormat(props.price)}
              </Typography>
            </>
          )}
        </Button>
      </Box>
    );
  };

  return getFloatingButton();
};

export default FloatingButton;
