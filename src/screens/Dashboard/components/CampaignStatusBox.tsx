import React from "react";
import { Box, Typography } from "@mui/material";
import { CustomIcon, CustomPaper } from "../../../global/components";
import CampaignStatusBoxStyle from "./CampaignStatusBox.styles";
import { campaignStatusBoxProps } from "../../../models/interfaces";
import { getFormattedStatsCount } from "../../../helpers/methods";

const CampaignStatusBox = (props: campaignStatusBoxProps) => {
  const classes = CampaignStatusBoxStyle;
  return (
    <CustomPaper>
      <Box sx={classes.boxStyle}>
        <CustomIcon icon={<img src={props.icon} />} />
        <Box ml={1}>
          <Typography sx={classes.textMargin}>{props.boxHeading}</Typography>
          <Typography sx={classes.dashboardDataSize}>
            {getFormattedStatsCount(props.data)}
          </Typography>
        </Box>
      </Box>
    </CustomPaper>
  );
};

export default CampaignStatusBox;
