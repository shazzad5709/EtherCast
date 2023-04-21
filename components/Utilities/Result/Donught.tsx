import React, { useEffect, useRef } from 'react';
import Chart, { ChartItem } from 'chart.js/auto';

function DonutChart({ data }:any) {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new Chart(chartRef.current, {
        type: 'doughnut',
        data: data,
      });

      return () => {
        chart.destroy();
      };
    }
  }, [data]);

  return <canvas ref={chartRef} style={{ width: '40vw', height: '40vh', margin: 'auto' }} />;
}

export default DonutChart;
