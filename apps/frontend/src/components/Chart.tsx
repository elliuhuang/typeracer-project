import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const WpmHistogram = ({ wpmData, mistakeData }) => {
    const numRaces = wpmData.length; 
    const wpmChartData = {
        labels: wpmData.map((_, index) => `Race ${index + 1}`),
        datasets: [
            {
                label: 'WPM',
                data: wpmData,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderWidth: 1,
            },
        ],
    };

    const mistakesChartData = {
        labels: mistakeData.map((_, index) => `Race ${index + 1}`),
        datasets: [
            {
                label: 'Mistakes',
                data: mistakeData,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                type: 'category',
                display: true,
                
            },
            y: {
                display: true,
                
            },
        },
    };

    return (
        <div className="chart-container">
            <div className="wpm-chart">
                <h3>WPM last {numRaces} races</h3>
                <Bar options={options} data={wpmChartData} />
            </div>
            <div className="mistakes-chart">
                <h3>Mistakes last {numRaces} races</h3>
                <Bar options={options} data={mistakesChartData} />
            </div>
        </div>
    );
};

