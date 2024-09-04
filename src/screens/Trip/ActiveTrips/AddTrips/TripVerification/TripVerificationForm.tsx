import React, { useState } from "react";
import { Box, Grid, Typography, Button, useTheme } from "@mui/material";
import { ReactComponent as UploadIcon } from "../../../../../assets/icons/UploadIcon.svg";
import { FiUpload } from "react-icons/fi";
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
  setImgSrc,
  imgSrc,
}) => {
  const theme = useTheme();
  const classes = TripVerificationFormStyles(theme);
  const [loader, setLoader] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    imgKey: string
  ) => {
    try {
      setLoader(true);
      const file = event.target.files?.[0];

      if (!file) return;

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
        [imgKey]: `http://localhost:6090/${response?.fileUpload?.fileName}`,
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
      {/* Vehicle Number Plate & Installed Lock Photo */}
      <Grid container spacing={10} sx={{ marginTop: "0.8rem" }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={classes.label}>
            Vehicle Number Plate
          </Typography>
          <Box sx={classes.imgDisplay}>
            <Box sx={classes.profileBox}>
              {imgSrc?.vehicleImg && (
                <img src={imgSrc.vehicleImg} alt="Uploaded Vehicle Image" />
              )}
            </Box>
          </Box>
          <input
            accept="image/jpeg,image/png,image/bmp"
            style={{ display: "none" }}
            id="vehicle-upload"
            type="file"
            onChange={(e) => handleFileUpload(e, "vehicleImg")}
          />
          <label htmlFor="vehicle-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<FiUpload />}
              sx={{
                backgroundColor: "#6842EF",
                color: "white",
                marginTop: 1,
                marginLeft: "9rem",
                "&:hover": {
                  backgroundColor: "#6842EF",
                },
              }}
            >
              Upload Vehicle Image
            </Button>
          </label>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={classes.label}>
            Installed Lock Photo
          </Typography>
          <Box sx={classes.imgDisplay}>
            <Box sx={classes.profileBox}>
              {imgSrc?.installLockImg && (
                <img
                  src={imgSrc.installLockImg}
                  alt="Uploaded Installed Lock Image"
                />
              )}
            </Box>
          </Box>
          <input
            accept="image/jpeg,image/png,image/bmp"
            style={{ display: "none" }}
            id="lock-upload"
            type="file"
            onChange={(e) => handleFileUpload(e, "installLockImg")}
          />
          <label htmlFor="lock-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<FiUpload />}
              sx={{
                backgroundColor: "#6842EF",
                color: "white",
                marginTop: 1,
                marginLeft: "9rem",
                "&:hover": {
                  backgroundColor: "#6842EF",
                },
              }}
            >
              Upload Lock Image
            </Button>
          </label>
        </Grid>
      </Grid>

      {/* Permit Photo & Payment Proof */}
      <Grid container spacing={10} sx={{ marginTop: "0.5rem" }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={classes.label}>
            Permit Photo
          </Typography>
          <Box sx={classes.imgDisplay}>
            <Box sx={classes.profileBox}>
              {imgSrc?.permitImg && (
                <img src={imgSrc.permitImg} alt="Uploaded Permit Image" />
              )}
            </Box>
          </Box>
          <input
            accept="image/jpeg,image/png,image/bmp"
            style={{ display: "none" }}
            id="permit-upload"
            type="file"
            onChange={(e) => handleFileUpload(e, "permitImg")}
          />
          <label htmlFor="permit-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<FiUpload />}
              sx={{
                backgroundColor: "#6842EF",
                color: "white",
                marginTop: 1,
                marginLeft: "9rem",
                "&:hover": {
                  backgroundColor: "#6842EF",
                },
              }}
            >
              Upload Permit Image
            </Button>
          </label>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" sx={classes.label}>
            Payment Proof
          </Typography>
          <Box sx={classes.imgDisplay}>
            <Box sx={classes.profileBox}>
              {imgSrc?.paymentProofImg && (
                <img
                  src={imgSrc.paymentProofImg}
                  alt="Uploaded Payment Proof"
                />
              )}
            </Box>
          </Box>
          <input
            accept="image/jpeg,image/png,image/bmp"
            style={{ display: "none" }}
            id="payment-proof-upload"
            type="file"
            onChange={(e) => handleFileUpload(e, "paymentProofImg")}
          />
          <label htmlFor="payment-proof-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<FiUpload />}
              sx={{
                backgroundColor: "#6842EF",
                color: "white",
                marginTop: 1,
                marginLeft: "9rem",
                "&:hover": {
                  backgroundColor: "#6842EF",
                },
              }}
            >
              Upload Payment Proof
            </Button>
          </label>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TripVerificationForm;
