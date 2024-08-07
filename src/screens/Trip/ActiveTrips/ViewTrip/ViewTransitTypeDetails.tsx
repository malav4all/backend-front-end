import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "../../assets/images/EditIcon.svg";
import viewTripStyle from "./ViewTripStyle";

interface CustomProps {
  transitTypeForm: any;
}

const ViewTransitTypeDetails = (props: CustomProps) => {
  const classes = viewTripStyle;

  const getTransitTypeDetails = () => {
    return (
      <Card sx={classes.card}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h3" sx={classes.jobDetailsText}>
              Transit Type
            </Typography>
            {/* <Box sx={classes.centerItemFlex}>
              <img src={EditIcon} alt="edit" />
            </Box> */}
          </Stack>
          <Typography variant="body2" sx={classes.workStatus}>
            Vehicle Type:
            <Typography variant="body2" ml={1}>
              {props.transitTypeForm.vehicleType}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={classes.workStatus}>
            Number of Passengers:
            <Typography variant="body2" ml={1}>
              {props.transitTypeForm.numberOfPassengers}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={classes.workStatus}>
            Special Requirements:
            <Typography variant="body2" ml={1}>
              {props.transitTypeForm.specialRequirements}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return getTransitTypeDetails();
};

export default ViewTransitTypeDetails;
