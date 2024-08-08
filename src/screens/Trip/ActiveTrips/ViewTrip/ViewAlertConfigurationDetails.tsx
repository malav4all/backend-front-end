import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
// import viewAlertConfigurationDetailsStyle from "./viewAlertConfigurationDetails.styles";
import EditIcon from "../../assets/images/EditIcon.svg";
import viewTripStyle from "./ViewTripStyle";
interface CustomProps {
  alertConfigurationForm: any;
}
const ViewAlertConfigurationDetails = (props: CustomProps) => {
  const classes = viewTripStyle;

  const getAlertConfigurationDetails = () => {
    return (
      <Card sx={classes.card}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" sx={classes.jobDetailsText}>
              Alert Configuration
            </Typography>
            {/* <Box sx={classes.centerItemFlex}>
              <img src={EditIcon} alt="edit" />
            </Box> */}
          </Stack>
          <Typography variant="body2" sx={classes.workStatus}>
            Alerts:
            <Typography variant="body2" ml={1}>
              {props?.alertConfigurationForm?.alertTypes?.join(", ")}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={classes.workStatus}>
            SMS:
            <Typography variant="body2" ml={1}>
              {props?.alertConfigurationForm?.alertMedium?.sms?.value}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={classes.workStatus}>
            WhatsApp:
            <Typography variant="body2" ml={1}>
              {props.alertConfigurationForm?.alertMedium?.whatsapp?.value}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={classes.workStatus}>
            Email:
            <Typography variant="body2" ml={1}>
              {props.alertConfigurationForm?.alertMedium?.email?.value}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return getAlertConfigurationDetails();
};

export default ViewAlertConfigurationDetails;
