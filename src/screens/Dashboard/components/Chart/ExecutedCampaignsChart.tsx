import { Box, Typography, Divider } from "@mui/material";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
} from "recharts";
import { CustomPaper } from "../../../../global/components";
import { campaignMatrixProps } from "../../../../models/interfaces";
import dashboardStyles from "../../DashboardStyles";

const ExecutedCampaignsChart = (props: campaignMatrixProps) => {
  const classes = dashboardStyles;
  return (
    <CustomPaper>
      <Typography sx={classes.headingMargins}>{props.chartHeading}</Typography>
      <Divider />
      <Box m={1} pb={1}>
        {props.data?.length === 0 ? (
          <Box
            style={{
              minHeight: "265px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography sx={classes.chartEmptyMsg}>
              Currently there is no data to display.
            </Typography>
          </Box>
        ) : (
          <ResponsiveContainer aspect={0} width={"100%"} minHeight={"265px"}>
            <PieChart>
              <Tooltip />
              <Legend />
              <Pie
                dataKey="count"
                startAngle={180}
                endAngle={0}
                data={props.data}
                cx="50%"
                cy="85%"
                outerRadius={140}
                // innerRadius={100}
                label
              >
                {props.data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={props.colors[index % props.colors.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </Box>
    </CustomPaper>
  );
};

export default ExecutedCampaignsChart;
