import React from "react";
import { CustomAppHeader } from "../../global/components";
import {
  boldFont,
  getRelativeFontSize,
  headerColor,
  primaryHeadingColor,
  theme,
} from "../../utils/styles";
import { Box, Grid, Typography } from "@mui/material";

const DeviceTransfer = () => {
  const getHeader = () => {
    return (
      <Box>
        <Typography
          sx={{
            ...boldFont,
            fontSize: getRelativeFontSize(10),
            color: primaryHeadingColor,
            [theme.breakpoints.down("md")]: {
              marginTop: theme.spacing(3),
            },
          }}
        >
          Device Transfer
        </Typography>
      </Box>
    );
  };

  return (
    <CustomAppHeader
      className={{
        backgroundColor: headerColor,
        padding: "50px 20px 50px 18px",
      }}
    >
      <Grid container xs={12} md={12} lg={12} xl={12} alignItems="center">
        <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
          {getHeader()}
        </Grid>
      </Grid>
    </CustomAppHeader>
  );
};

export default DeviceTransfer;
