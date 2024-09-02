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
import moment from "moment-timezone";
import strings from "../../../../global/constants/StringConstants";
import viewTripStyle from "./ViewTripStyle";

interface CustomProps {
  tripInformationForm?: any;
}

const ViewTripInformationDetails = (props: CustomProps) => {
  const classes = viewTripStyle;

  const getTripDetails = () => {
    return (
      <Card sx={classes.card}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between">
            {/* <Box sx={classes.centerItemFlex}>
              <img src={EditIcon} alt="edit" />
            </Box> */}
          </Stack>
          <Typography variant="h5" sx={classes.jobTitleText}>
            {props.tripInformationForm?.tripName}
          </Typography>
          <Typography variant="body2" sx={classes.workStatus}>
            Trip Status:
            <Typography variant="body2" ml={1}>
              {props.tripInformationForm?.status}
            </Typography>
          </Typography>

          <Typography variant="body2" sx={classes.workStatus}>
            Start Date:
            <Typography variant="body2" ml={1}>
              {moment(props.tripInformationForm.tripStartDate).format(
                strings.DATE_FORMAT
              )}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={classes.workStatus}>
            End Date:
            <Typography variant="body2" ml={1}>
              {moment(props.tripInformationForm.tripEndDate).format(
                strings.DATE_FORMAT
              )}
            </Typography>
          </Typography>
        </CardContent>
      </Card>
    );
  };

  return getTripDetails();
};

export default ViewTripInformationDetails;
