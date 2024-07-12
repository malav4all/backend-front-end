import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Box, useTheme } from "@mui/material";

interface PieChartProps {
  width?: number;
}

const OfflinePieChart: React.FC<PieChartProps> = ({ width = 350 }) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "pie",
          width: width,
          background: "#ffffff",
        },
        series: [44, 66],
        labels: ["Offline", "Disconnected"],
        responsive: [
          {
            breakpoint: 4080,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [width]);

  return (
    <Box
      ref={chartRef}
      sx={{
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
