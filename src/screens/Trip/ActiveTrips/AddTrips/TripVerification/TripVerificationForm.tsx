import React, { useState } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { DropzoneAreaBase } from "react-mui-dropzone";
import { ReactComponent as UploadIcon } from "../../../../../assets/icons/UploadIcon.svg";
import ProfileIcon from "../../../../../assets/icons/ProfileIcon.svg";
import TripVerificationFormStyles from "./TripVerificationForm.styles";
import {
  isTruthy,
  openErrorNotification,
  openSuccessNotification,
} from "../../../../../helpers/methods";
import notifiers from "../../../../../global/constants/NotificationConstants";
import { fileUpload } from "../AddTripService";

interface TripVerificationFormProps {
  tripVerificationForm?: any;
  setTripVerificationForm?: Function;
  setImgSrc?: any;
  imgSrc?: any;
}

const TripVerificationForm: React.FC<TripVerificationFormProps> = ({
  tripVerificationForm,
  setTripVerificationForm,
  setImgSrc,
  imgSrc,
}) => {
  const theme = useTheme();
  const classes = TripVerificationFormStyles(theme);

  const [loader, setLoader] = useState(false);

  const handleVehiclePhotoChange = async (event: any) => {
    try {
      setLoader(true);

      const file = event[0].file;

      const response = await fileUpload({
        input: {
          file,
        },
      });
      openSuccessNotification(
        `${response?.fileUpload?.fileName}${response?.fileUpload?.message}`
      );
      setImgSrc({
        ...imgSrc,
        vehicleImg: `http://localhost:6090/${response?.fileUpload?.fileName}`,
      });
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };
  const handleinstallLockPhotoChange = async (event: any) => {
    try {
      setLoader(true);

      const file = event[0].file;

      const response = await fileUpload({
        input: {
          file,
        },
      });
      openSuccessNotification(
        `${response?.fileUpload?.fileName}${response?.fileUpload?.message}`
      );
      setImgSrc({
        ...imgSrc,
        installLockImg: `http://localhost:6090/${response?.fileUpload?.fileName}`,
      });
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };
  const handlePermitPhotoChange = async (event: any) => {
    try {
      setLoader(true);

      const file = event[0].file;

      const response = await fileUpload({
        input: {
          file,
        },
      });
      openSuccessNotification(
        `${response?.fileUpload?.fileName}${response?.fileUpload?.message}`
      );
      setImgSrc({
        ...imgSrc,
        permitImg: `http://localhost:6090/${response?.fileUpload?.fileName}`,
      });
      setLoader(false);
    } catch (error: any) {
      setLoader(false);
      openErrorNotification(
        isTruthy(error.message) ? error.message : notifiers.GENERIC_ERROR
      );
    }
  };
  return (
    <Grid container spacing={4} padding={5}>
      {/* Vehicle Number Plate */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={2} xl={2}>
          <Typography variant="subtitle1" sx={classes.label}>
            Vehicle Number Plate
          </Typography>
          <Box sx={classes.imgDisplay}>
            <Box sx={classes.profileBox}>
              {imgSrc && <img src={imgSrc.vehicleImg} alt="Uploaded Image" />}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} xl={10}>
          <Box sx={classes.customDropZone}>
            <DropzoneAreaBase
              fileObjects={[]}
              Icon={UploadIcon}
              showAlerts={false}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              filesLimit={1}
              onAdd={(event: React.ChangeEvent<any> | any) =>
                handleVehiclePhotoChange(event)
              }
              dropzoneText={`Click and upload an image for profile. 200 x 200 or higher recommended. Max 2MB (png, jpg, jpeg)`}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Installed Lock Photo */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={2} xl={2}>
          <Typography variant="subtitle1" sx={classes.label}>
            Installed Lock Photo
          </Typography>
          <Box sx={classes.imgDisplay}>
            <Box sx={classes.profileBox}>
              {imgSrc && (
                <img src={imgSrc.installLockImg} alt="Uploaded Image" />
              )}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} xl={10}>
          <Box sx={classes.customDropZone}>
            <DropzoneAreaBase
              fileObjects={[]}
              Icon={UploadIcon}
              showAlerts={false}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              filesLimit={1}
              onAdd={(event: React.ChangeEvent<any> | any) =>
                handleinstallLockPhotoChange(event)
              }
              dropzoneText={`Click and upload an image for profile. 200 x 200 or higher recommended. Max 2MB (png, jpg, jpeg)`}
            />
          </Box>
        </Grid>
      </Grid>

      {/* Permit Photo */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={3} sm={3} md={3} lg={2} xl={2}>
          <Typography variant="subtitle1" sx={classes.label}>
            Permit Photo
          </Typography>
          <Box sx={classes.imgDisplay}>
            <Box sx={classes.profileBox}>
              {imgSrc && <img src={imgSrc.permitImg} alt="Uploaded Image" />}
            </Box>
          </Box>
        </Grid>
        <Grid item xs={9} sm={9} md={9} lg={10} xl={10}>
          <Box sx={classes.customDropZone}>
            <DropzoneAreaBase
              fileObjects={[]}
              Icon={UploadIcon}
              showAlerts={false}
              acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
              filesLimit={1}
              onAdd={(event: React.ChangeEvent<any> | any) =>
                handlePermitPhotoChange(event)
              }
              dropzoneText={`Click and upload an image for profile. 200 x 200 or higher recommended. Max 2MB (png, jpg, jpeg)`}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TripVerificationForm;
