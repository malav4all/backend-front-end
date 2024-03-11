import { Box } from "@mui/system";
import { CustomIcon } from "..";
import closeButtonStyles from "./CloseButton.styles";
import ClearIcon from "@mui/icons-material/Clear";

interface CustomProps {
  onClick: Function;
  customClasses?: string;
}

const CloseButton = (props: CustomProps) => {
  const classes = closeButtonStyles();
  const appliedClass = props.customClasses
    ? props.customClasses
    : classes.closeBtn;

  const getCloseButton = () => {
    return (
      <Box className={appliedClass} onClick={() => props.onClick()}>
        <CustomIcon icon={<ClearIcon fontSize="large" />} />
      </Box>
    );
  };

  return getCloseButton();
};

export default CloseButton;
