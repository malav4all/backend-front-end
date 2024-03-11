import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";
import dashboardStyles from "../../DashboardStyles";

interface CustomProps {
  graphData: { name: string; value: number; fill: string }[];
  total: number;
}

const RecentCampaignStatschart = (props: CustomProps) => {
  const classes = dashboardStyles;
  const data = props.graphData.map((stat) => {
    return {
      ...stat,
      portion: stat.value / (props.total === 0 ? 1 : props.total),
    };
  });

  const renderLegend = () => {
    return (
      <Grid container spacing={1}>
        {data.map((item, index) => (
          <Grid item xs={6} sm={6} md={3} lg={6} xl={6} key={index}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              justifyContent="center"
            >
              <Box
                sx={{
                  height: "8px",
                  width: "8px",
                  backgroundColor: item.fill,
                  borderRadius: "50%",
                }}
              ></Box>
              <Typography sx={classes.graphLegend}>{item.name}</Typography>
              <Typography sx={classes.heading}>{item.value}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box width="100%">
      <ResponsiveContainer minHeight={300}>
        <RadialBarChart
          barSize={5}
          innerRadius="10%"
          outerRadius="80%"
          data={data}
          cx="48%"
          cy="35%"
        >
          <RadialBar background dataKey="portion" />
          <Legend content={renderLegend} />
        </RadialBarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default RecentCampaignStatschart;
