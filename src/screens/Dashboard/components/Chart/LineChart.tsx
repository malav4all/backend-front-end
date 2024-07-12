import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface LineChartProps {
  height?: number;
}

const LineChart: React.FC<LineChartProps> = ({ height = 350 }) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const options: ApexCharts.ApexOptions = {
        chart: {
          height: height,
          type: 'area',
          zoom: {
            enabled: false,
          },
          background: '#ffffff',
        },
        series: [
          {
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100],
          },
          {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41],
          },
        ],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: 'smooth',
        },
        xaxis: {
          type: 'datetime',
          categories: [
            '2018-09-19T00:00:00.000Z',
            '2018-09-19T01:30:00.000Z',
            '2018-09-19T02:30:00.000Z',
            '2018-09-19T03:30:00.000Z',
            '2018-09-19T04:30:00.000Z',
            '2018-09-19T05:30:00.000Z',
            '2018-09-19T06:30:00.000Z',
          ],
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm',
          },
        },
      };

      const chart = new ApexCharts(chartRef.current, options);
      chart.render();

      return () => {
        chart.destroy();
      };
    }
  }, [height]);

  return <div ref={chartRef} />;
};

export default LineChart;
