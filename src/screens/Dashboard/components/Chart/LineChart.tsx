import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Box, useTheme } from "@mui/material";

interface LineChartProps {
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ height = 350 }) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const options: ApexCharts.ApexOptions = {
        chart: {
          height: height,
          type: "area",
          zoom: {
            enabled: false,
          },
          background: "#0000000",
        },
        series: [
          {
            name: "series1",
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: "series2",
            data: [11, 32, 45, 32, 34, 52, 41],
          },
        ],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2018-09-19T00:00:00.000Z",
            "2018-09-19T01:30:00.000Z",
            "2018-09-19T02:30:00.000Z",
            "2018-09-19T03:30:00.000Z",
            "2018-09-19T04:30:00.000Z",
            "2018-09-19T05:30:00.000Z",
            "2018-09-19T06:30:00.000Z",
          ],
          labels: {
            style: {
              colors: theme.palette.text.primary,
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: theme.palette.text.primary,
            },
          },
        },
        tooltip: {
          theme: "dark", // or 'light' depending on your preference
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        legend: {
          labels: {
            colors: theme.palette.text.primary,
          },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [height, theme.palette.text.primary]);

  return (
    <Box
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
      ref={chartRef}
    />
  );
};

export default LineChart;
