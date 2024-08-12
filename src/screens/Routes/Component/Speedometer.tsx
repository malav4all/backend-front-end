import React from "react";
import ApexCharts from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const Speedometer = ({ speed }: { speed: number }) => {

  const options: ApexOptions = {
    series: [speed],
    chart: {
      type: "radialBar", 
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
          size: "70%",
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
        //   margin: 5, 
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "12px",
            formatter: function (val) {
              return `${val}`; 
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
        backgroundColor: "#fff",
        padding: "10px",
        borderRadius: "5px", // Rounded shape
        boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
        textAlign: "center",
        width: "200px", // Width set to 200px
        height: "150px", // Height set to 200px
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ApexCharts
        options={options}
        series={options.series}
        type="radialBar"
        height={180}
      />
    </div>
  );
};

export default Speedometer;
