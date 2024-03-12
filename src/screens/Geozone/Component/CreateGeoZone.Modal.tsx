import { Box, Grid, Typography } from "@mui/material";
import {
  CustomButton,
  CustomDialog,
  CustomInput,
} from "../../../global/components";
import addGeozone from "../../../assets/images/uploadUser.svg";
import geozoneStyle from "../Geozone.styles";
import React from "react";

interface GeoZoneProps {
  isOpenModal: boolean;
  handleUpdateDialogClose: Function;
  setFormField: any;
  formField: any;
}
const CreateGeoZone = ({
  isOpenModal,
  handleUpdateDialogClose,
  setFormField,
  formField,
}: GeoZoneProps) => {
  const classes = geozoneStyle;

  const updateUserDialogTitle = () => {
    return (
      <Box>
        <Typography sx={classes.boldFonts}>Create GeoZone</Typography>
      </Box>
    );
  };

  const handleCancelUpdateModal = () => {
    handleUpdateDialogClose();
  };

  const modalHeader = () => {
    return (
      <Box display={"flex"}>
        <img src={addGeozone} alt="Update user image not found!" />
      </Box>
    );
  };

  const handleOnChange = (e: any) => {
    setFormField({
      ...formField,
      [e.target.name]: {
        ...formField[e.target.name],
        value: e.target.value,
        error: "",
      },
    });
  };

  const updateUserDialogFooter = () => {
    return (
      <Grid container sx={classes.centerItemFlex}>
        <Box sx={classes.dialogFooter}>
          <CustomButton
            id="update_user_cancel_button"
            label="Cancel"
            onClick={handleCancelUpdateModal}
            customClasses={classes.cancelButtonStyle}
          />
          <CustomButton
            id="update_user_submit_button"
            label="Save"
            onClick={() => {}}
          />
        </Box>
      </Grid>
    );
  };

  const geoZoneBody = () => {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomInput
            required
            label="Circle Name"
            id="circleName"
            placeHolder="Enter Circle Name"
            name="circleName"
            value={formField.circleName.value}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomInput
            required
            label="Circle Radius"
            id="circleRadius"
            name="circleRadius"
            placeHolder="Enter Circle Radius"
            value={formField.circleRadius.value}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomInput
            required
            label="Mobile No"
            id="mobileNo"
            name="mobileNo"
            placeHolder="Enter Mobile No"
            value={formField.mobileNo.value}
            onChange={handleOnChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <CustomInput
            required
            label="Client Name"
            id="clientName"
            name="clientName"
            placeHolder="Enter Client Name"
            value={formField.clientName.value}
            onChange={handleOnChange}
          />
        </Grid>
      </Grid>
    );
  };

  console.log(formField);

  const geoZone = () => {
    return (
      <CustomDialog
        isDialogOpen={isOpenModal}
        closable
        closeButtonVisibility
        handleDialogClose={handleUpdateDialogClose}
        dialogHeaderContent={modalHeader()}
        dialogTitleContent={updateUserDialogTitle()}
        dialogBodyContent={geoZoneBody()}
        dialogFooterContent={updateUserDialogFooter()}
        width={"400px"}
      />
    );
  };

  return <Box>{geoZone()}</Box>;
};

export default React.memo(CreateGeoZone);
