import { Box, useMediaQuery } from "@mui/material";
import {
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from "recharts";
import { theme } from "../../../../utils/styles";

interface CustomProps {
  data: any;
}

const COLORS = ["#FFCDEE", "#0069A9", "#462682", "#059df5", "#ACC837"];

const CampaignRecipientPieChart = (props: CustomProps) => {
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box>
      <ResponsiveContainer aspect={0} width={"100%"} minHeight={"265px"}>
        <BarChart
          width={isDesktop ? 800 : 200}
          height={220}
          data={props.data}
          barSize={10}
        >
          <XAxis dataKey="name" padding={{}} />
          <YAxis />
          <Tooltip cursor={{ fill: "#fff" }} />
          <CartesianGrid strokeDasharray="0" vertical={false} />
          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
            {props.data.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CampaignRecipientPieChart;
