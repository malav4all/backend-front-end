import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Box, useTheme } from "@mui/material";

interface PieChartProps {
  width?: number | string;
  height?: number;
}

const OnlinePieChart: React.FC<PieChartProps> = ({
  width = "100%",
  height = 400,
}) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const isDarkMode = theme.palette.mode === "dark";
      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "radialBar",
          width: width,
          height: height,
          background: theme.palette.background.paper,
          foreColor: theme.palette.text.primary,
        },
        plotOptions: {
          radialBar: {
            track: {
              background: isDarkMode ? "#060B25" : "#F4F4F4", // Change color based on theme
            },
            dataLabels: {
              name: {
                fontSize: "22px",
              },
              value: {
                fontSize: "16px",
              },
              total: {
                show: true,
                label: "Online Device",
                formatter: function (w) {
                  return "112";
                },
              },
            },
          },
        },
        series: [44, 55, 13],
        labels: ["Motion", "Idle", "Stop"],
        tooltip: {
          enabled: true,
          theme: theme.palette.mode, // Use theme mode for tooltip theme
          y: {
            formatter: function (value, { seriesIndex }) {
              return `${value} Devices`;
            },
            title: {
              formatter: function (seriesName) {
                return `${seriesName}:`;
              },
            },
          },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [width, height, theme]);

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

export default OnlinePieChart;
