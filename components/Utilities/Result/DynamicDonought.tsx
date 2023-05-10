import { useState, useEffect } from 'react';
import DonutChart from './Donught';


function DynamicDonutChart() {
  const [chartData, setChartData] = useState({
    labels: ['Abul', 'Kobul', 'Mokbul'],
    datasets: [
      {
        label: 'Result',
        data: [30, 50, 20],
        backgroundColor: ['#fc5e03', '#0d9488', '#fcba03'],
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
            backgroundColor: ['#fc5e03', '#0d9488', '#fcba03'],
          },
        ],
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return <DonutChart data={chartData} />;
}

export default DynamicDonutChart;
