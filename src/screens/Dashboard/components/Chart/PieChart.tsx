import React, { useEffect, useRef } from "react";
import ApexCharts from "apexcharts";

interface PieChartProps {
  width?: number;
}

const PieChart: React.FC<PieChartProps> = ({ width = 350 }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const options: ApexCharts.ApexOptions = {
        chart: {
          type: "pie",
          width: width,
          background: "#ffffff",
        },
        series: [44, 55, 13],
        labels: ["Motion", "Idel", "Stop",],
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

  return <div ref={chartRef} />;
};

export default PieChart;
