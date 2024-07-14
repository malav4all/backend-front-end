import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";
import { Box, useTheme } from "@mui/material";

interface LineChartProps {
  width?: number | string;
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({
  width = "100%",
  height = 400,
}) => {
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const isDarkMode = theme.palette.mode === "dark";

      // Apply custom styles for the export menu in dark mode
      const customStyles = `
        .apexcharts-menu {
          background: ${isDarkMode ? '#060B25' : '#FFFFFF'} !important;
          color: ${isDarkMode ? '#FFFFFF' : '#000000'} !important;
        }
        .apexcharts-menu-item:hover {
          background: ${isDarkMode ? '#15152E' : '#E0E0E0'} !important;
        }
      `;
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      styleSheet.innerText = customStyles;
      document.head.appendChild(styleSheet);

      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "area", 
          width: width,
          height: height,
          background: theme.palette.background.paper,
          foreColor: theme.palette.text.primary,
          toolbar: {
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
            autoSelected: 'zoom',
          }
        },
        stroke: {
          curve: 'smooth', 
        },
        series: [
          {
            name: "series1",
            data: [31, 40, 28, 51, 42, 109, 100]
          },
          {
            name: "series2",
            data: [11, 32, 45, 32, 34, 52, 41]
          }
        ],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        },
        yaxis: {
          opposite: isDarkMode,
        },
        grid: {
          borderColor: isDarkMode ? "#060B25" : "#E0E0E0",
        },
        tooltip: {
          theme: theme.palette.mode,
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
        document.head.removeChild(styleSheet);
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

export default LineChart;
