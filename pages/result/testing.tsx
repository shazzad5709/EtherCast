import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const BarChart = () => {
  const [data, setData] = useState([]);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data/Officer/createCandidate');
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const renderChart = () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Destroy the existing chart instance
      }

      const ctx = document.getElementById('barChart') as HTMLCanvasElement;
      const labels = data.map((item: any) => item.name); // Replace "label" with the actual field name in your data model
      const values = data.map((item: any) => item.id); // Replace "value" with the actual field name in your data model

      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Result',
              data: values,
              backgroundColor: 'rgba(75,192,192,0.6)',
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    };

    renderChart();
  }, [data]);

  return <canvas id="barChart" />;
};

export default BarChart;
