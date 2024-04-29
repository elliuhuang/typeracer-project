// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// interface WpmHistogramProps {
//   data: number[]; 
// }

// const WpmHistogram: React.FC<WpmHistogramProps> = ({ data }) => {
//   const chartRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     if (!chartRef.current || data.length === 0) return;

//     const ctx = chartRef.current.getContext('2d');
//     if (!ctx) return;

//     new Chart(ctx, {
//       type: 'bar',
//       data: {
//         labels: data.map((_, index) => `Race ${index + 1}`),
//         datasets: [{
//           label: 'WPM',
//           data: data,
//           backgroundColor: 'rgba(54, 162, 235, 0.2)', 
//           borderColor: 'rgba(54, 162, 235, 1)',
//           borderWidth: 1
//         }]
//       },
//       options: {
//         scales: {
//           y: {
//             beginAtZero: true
//           }
//         }
//       }
//     });
//   }, [data]);

//   return <canvas ref={chartRef} />;
// };

// export default WpmHistogram;
import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';

export const WpmHistogram = () => {
    return (
    <Bar 
        data={{
            labels: ["A", "B", "C"],
            datasets: [
                {
                    label: "Revenue",
                    data: [200, 300, 400],
                }
            ]
        }}
    />
    );
}