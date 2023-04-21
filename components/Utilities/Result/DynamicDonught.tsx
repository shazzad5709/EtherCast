import { useState, useEffect } from 'react';
import DonutChart from './Donught';


function DynamicDonutChart() {
  const [chartData, setChartData] = useState({
    labels: ['Abul', 'Kobul', 'Mokbul'],
    datasets: [
      {
        label: 'Result',
        data: [30, 50, 20],
        backgroundColor: ['red', 'blue', 'yellow'],
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData({
        labels: ['Abul', 'Kobul', 'Mokbul'],
        datasets: [
          {
            label: 'My Dataset',
            data: [Math.random() * 100, Math.random() * 100, Math.random() * 100],
            backgroundColor: ['red', 'blue', 'yellow'],
          },
        ],
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <DonutChart data={chartData} />;
}

export default DynamicDonutChart;
