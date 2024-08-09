import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Box, Typography, useTheme } from "@mui/material";

interface LineChartProps {
  width?: number | string;
  height?: number;
  dataGraph?: any;
}

const SpeedLineChart: React.FC<LineChartProps> = ({
  width = "100%",
  height = 200,
  dataGraph,
}) => {
  console.log({ dataGraph });
  const theme = useTheme();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chart, setChart] = useState<ApexCharts | null>(null);

  useEffect(() => {
    const isDarkMode = theme.palette.mode === "dark";

    const customStyles = `
      .apexcharts-menu {
        background: ${isDarkMode ? "#060B25" : "#FFFFFF"} !important;
        color: ${isDarkMode ? "#FFFFFF" : "#000000"} !important;
      }
      .apexcharts-menu-item:hover {
        background: ${isDarkMode ? "#15152E" : "#E0E0E0"} !important;
      }
    `;
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);

    const options: ApexCharts.ApexOptions = {
      chart: {
        type: "area",
        width: "100%",
        height: height,
        background: theme.palette.background.paper,
        foreColor: theme.palette.text.primary,
        toolbar: {
          show: false,
        },
      },
      stroke: {
        curve: "smooth",
        width: 1.5,
      },
      // colors: ["#00E396"],
      dataLabels: {
        enabled: false,
      },
      series: dataGraph?.series || [],
      xaxis: {
        categories: dataGraph?.xaxis?.categories,
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

    const chartInstance = new ApexCharts(chartRef.current, options);
    chartInstance.render();
    setChart(chartInstance);

    return () => {
      chartInstance.destroy();
      document.head.removeChild(styleSheet);
    };
  }, [height, theme, dataGraph]);

  useEffect(() => {
    const handleResize = () => {
      if (chart && chartRef.current) {
        chart.updateOptions({
          chart: {
            width: chartRef.current.offsetWidth,
          },
        });
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize(); // Initial resize to set correct dimensions

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [chart]);

  return (
    <Box
      sx={{
        padding: "0.2rem",
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        border: "1px solid",
        borderColor: theme.palette.divider,
        color: theme.palette.text.primary,
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "Geist_semibold",
          fontSize: "0.9rem",
          marginBottom: "0.5rem",
          padding: "0.2rem 0.8rem",
          borderRadius: "5px",
          borderLeft: "7px solid",
          borderLeftColor: "#855BDE",
        }}
      >
        Speed (Past 24 Hours)
      </Typography>
      <Box ref={chartRef} sx={{ height: height, width: "100%" }} />
    </Box>
  );
};

export default SpeedLineChart;
