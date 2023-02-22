'use client'

import React from 'react'
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

const BarGraph = () => {
   const options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         y: {
            border: {
               display: true,
               width: 2,
               color: 'rgba(232, 237, 223, .25)',
            },
            ticks: {
               callback: (value:any) => '$' + value,
               color:'rgba(232, 237, 223, .55)',
               font: {
                  size: 12,
               }
            },
         },
         x: {
            border: {
               display: true,
               width: 2,
               color: 'rgba(232, 237, 223, .25)',
            },
            ticks: {
               color:'rgba(232, 237, 223, .55)',
               font: {
                  size: 12,
               }
            },
         }
      },
      plugins: {
         legend: {
            labels: {
               usePointStyle: true,
               pointStyle: 'circle',
               color: 'rgba(232, 237, 223, .55)',
            }
         }
      }
   }

   const data = {
      labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
         {
            label: 'Earned',
            data: [120,270,300,610,900,547,234],
            backgroundColor: '#F5CB5C',
            borderColor: '#333533',
            borderWidth: 1,
            borderRadius: 12,
         },
         {
            label: 'Spent',
            data: [90,370,560,725,400,105,70],
            backgroundColor: '#E8EDDF',
            borderColor: '#333533',
            borderWidth: 1,
            borderRadius: 12,
         },
      ]
   }

   return (
      <Bar options={options} data={data} />
   )
}

export default BarGraph