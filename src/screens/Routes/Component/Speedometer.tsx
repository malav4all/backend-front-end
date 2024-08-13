import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { Typography, useTheme } from "@mui/material";

const Speedometer = ({ speed }: { speed: any }) => {
  const theme = useTheme();
  const options: ApexOptions = {
    chart: {
      type: "radialBar",
      width: "100%",
      height: 200,
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: "20%", // Reduce hollow size to make the blue part thicker
        },
        track: {
          background: "#16497D",
          strokeWidth: "100%", // Thicker background track
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: 20,
            color: theme.palette.text.primary,
            fontSize: "15px",
            formatter: function (val) {
              return `${val} Km/h`;
            },
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },

    yaxis: {
      min: 0,
      max: 150,
    },
  };

  return (
    <div
      style={{
        position: "absolute",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
        background: theme.palette.background.paper,
        color: theme.palette.text.primary,
        padding: "10px",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
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
        Speed (Live)
      </Typography>
      <ApexCharts
        options={options}
        series={[speed]}
        type="radialBar"
        height={180}
        width={200}
      />
    </div>
  );
};

export default Speedometer;
