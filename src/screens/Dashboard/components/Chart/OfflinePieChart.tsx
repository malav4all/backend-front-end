import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Box, useTheme } from "@mui/material";

interface PieChartProps {
  width?: number;
  height?: number;
}

const OfflinePieChart: React.FC<PieChartProps> = ({
  width = "100%",
  height = 400,
}) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "radialBar",
          width: width,
          height: height,
          background: "#ffffff",
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
              },
              total: {
                show: true,
                label: "Offline Device",
                formatter: function (w) {
                  return "110";
                },
              },
            },
          },
        },
        series: [44, 66],
        labels: ["Offline", "Disconnected"],
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [width, height]);

  return (
    <Box
      ref={chartRef}
      sx={{
        height: height,
        padding: "2rem 1.5rem",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        border: "1px solid",
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
      }}
    />
  );
};

export default OfflinePieChart;
