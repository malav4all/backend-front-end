import { Avatar, Box, Grid, Stack, Typography } from "@mui/material";
import strings from "../../../global/constants/StringConstants";
import history from "../../../utils/history";

import { CustomButton } from "../../../global/components";
import { ReactComponent as EditIcon } from "../../../assets/icons/Edit.svg";
import viewHeaderComponentStyle from "./viewHeaderComponentStyle";
import urls from "../../constants/UrlConstants";

interface CustomProps {
  showEditButton?: boolean;
  hideAssignTask?: boolean;
  from?: string;
  tripInformationForm?: any;
  alertConfigurationForm?: any;
  transitTypeForm?: any;
  personId?: string;
  tabValue?: string;
}

const ViewHeaderComponent = (props: CustomProps) => {
  const classes = viewHeaderComponentStyle;

  const handleEdit = () => {
    history.push({
      pathname: urls.editTripViewPath,
      state: {
        edit: true,
        tripInformationForm: props.tripInformationForm,
        alertConfigurationForm: props.alertConfigurationForm,
        transitTypeForm: props.transitTypeForm,
        personId: props.personId,
      },
    });
  };

  const getHeaderDetails = () => (
    <Grid container sx={classes.headerBox}>
      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
        <Box sx={classes.mainBox}>
          {props?.tripInformationForm &&
            props?.alertConfigurationForm &&
            props?.transitTypeForm && (
              <Stack
                direction="row"
                alignItems="center"
                spacing={2}
                sx={classes.avatar}
              >
                <Avatar sx={classes.avatarStyle}>
                  {props?.tripInformationForm?.tripName?.charAt(0)}
                </Avatar>

                <Stack direction="column">
                  <Typography variant="h1" sx={classes.consultantText}>
                    {props?.tripInformationForm?.tripName}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                    sx={classes.infoWrapper}
                  >
                    <Box sx={classes.infoItem}>
                      <Typography variant="body2">
                        {props?.tripInformationForm?.status}
                      </Typography>
                    </Box>
                    <Box sx={classes.infoItem}>
                      <Box sx={classes.connecterBox} />
                      <Typography variant="body2">
                        {props?.transitTypeForm?.vehicleType}
                      </Typography>
                    </Box>
                    <Box sx={classes.infoItem}>
                      <Box sx={classes.connecterBox} />
                      <Typography variant="body2">
                        {props?.tripInformationForm?.tripStartDate}
                      </Typography>
                    </Box>
                  </Stack>
                </Stack>
              </Stack>
            )}

          <Stack
            direction={{
              lg: "row",
              md: "row",
              sm: "row",
              xs: "column",
            }}
            justifyContent={{
              lg: "space-between",
              md: "space-between",
              sm: "space-between",
              xs: "flex-start",
            }}
            alignItems={{ lg: "center", sm: "center" }}
            mt={1.5}
          >
            <Stack
              direction="row"
              justifyContent={{ lg: "flex-end" }}
              alignItems="center"
              spacing={1}
              sx={classes.viewHeaderLeft}
            >
              {/* {props.tabValue &&
                props.tabValue === strings.general &&
                props.showEditButton && ( */}
              <CustomButton
                label={strings.Edit}
                buttonType="primaryBtn"
                onClick={() => handleEdit()}
                // startIcon={<EditIcon />}
              />
            </Stack>
          </Stack>
        </Box>
      </Grid>
    </Grid>
  );

  return getHeaderDetails();
};

export default ViewHeaderComponent;