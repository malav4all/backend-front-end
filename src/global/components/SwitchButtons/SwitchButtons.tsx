import switchButtonsStyles from "./SwitchButtons.styles";
import clsx from "clsx";
import { Box, Button } from "@mui/material";
import { SwitchButtonProps } from "../../../models/interfaces";

interface CustomProps {
  primaryButton: SwitchButtonProps;
  secondaryButton: SwitchButtonProps;
  primaryButtonActive: boolean;
  primaryButtonDisabled: boolean;
  secondaryButtonDisabled: boolean;
}

function SwitchButtons(props: CustomProps) {
  const classes = switchButtonsStyles();

  return (
    <Box className={classes.buttonsContainer}>
      <Button
        disabled={props.primaryButtonDisabled}
        className={clsx({
          [classes.activeButton]: props.primaryButtonActive,
          [classes.inactiveButton]: !props.primaryButtonActive,
        })}
        onClick={() => {
          props.primaryButton.onClick();
        }}
      >
        {props.primaryButton.text}
      </Button>
      <Button
        disabled={props.secondaryButtonDisabled}
        className={clsx({
          [classes.activeButton]: !props.primaryButtonActive,
          [classes.inactiveButton]: props.primaryButtonActive,
        })}
        onClick={() => {
          props.secondaryButton.onClick();
        }}
      >
        {props.secondaryButton.text}
      </Button>
    </Box>
  );
}

export default SwitchButtons;
