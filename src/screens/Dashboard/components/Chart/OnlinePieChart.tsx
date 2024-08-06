import React, { useEffect, useRef, useState } from "react";
import ApexCharts from "apexcharts";
import { Box, Typography, useTheme } from "@mui/material";

interface PieChartProps {
  width?: number | string;
  height?: number;
}

const OnlinePieChart: React.FC<PieChartProps> = ({
  width = "100%",
  height = 300,
}) => {
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
        type: "radialBar",
        width: "100%",
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
              formatter: function () {
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
        theme: theme.palette.mode,
        y: {
          formatter: function (value) {
            return `${value} Devices`;
          },
          title: {
            formatter: function (seriesName) {
              return `${seriesName}:`;
            },
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
        horizontalAlign: "center",
        labels: {
          colors: theme.palette.text.primary,
          useSeriesColors: false,
        },
      },
    };

    const chartInstance = new ApexCharts(chartRef.current, options);
    chartInstance.render();
    setChart(chartInstance);

    return () => {
      chartInstance.destroy();
      document.head.removeChild(styleSheet);
    };
  }, [height, theme]);

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
        padding: "2rem 1.5rem",
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
          fontFamily: "Geist_Light",
          fontSize: "1.5rem",
          marginBottom: "0.5rem",
          padding: "0.2rem 0.8rem",
          borderRadius: "5px",
          borderLeft: "7px solid",
          borderLeftColor: "#855BDE",
        }}
      >
        Online Devices
      </Typography>
      <Box ref={chartRef} sx={{ height: height, width: "100%" }} />
    </Box>
  );
};

export default OnlinePieChart;