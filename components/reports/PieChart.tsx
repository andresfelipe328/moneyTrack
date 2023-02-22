'use client'

import React from 'react'
import {
   Chart as ChartJS,
   Tooltip,
   Legend,
   ArcElement
 } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { BsCreditCard2BackFill } from 'react-icons/bs';

ChartJS.register(
   ArcElement, 
   Tooltip, 
   Legend
);

const PieChart = () => {
   const options = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: 80,
      datasets: {
         doughnut: {
            borderWidth: 2,
            borderColor: 'rgba(36, 36, 35, .8)',
            radius: 95,
         }
      },
      elements: {
         arc: {
            borderWidth: 2,
            hoverBorderWidth: 5,
            // spacing: 5,
            // borderRadius: 3,
         }
      },
      plugins: {
         legend: {
            labels: {
               usePointStyle: true,
               pointStyle: 'circle',
               color: 'rgba(232, 237, 223, .55)',
            }
         },
         title: {
            display: false,
         },
      }
   };

   const data = {
      labels: [
        'Recreation',
        'healthcare',
        'Food'
      ],
      datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
          '#E0E1DD',
          '#778DA9',
          '#F5CB5C'
        ],
      }]
   };

   return (
      <div className='relative h-[15rem]'>
         <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -z-10'>
            <BsCreditCard2BackFill className='icon text-xl mx-auto'/>
            <p>Monthly Spending:</p>
            <p>$450</p>
         </div>
         <Doughnut data={data} options={options}/>
      </div>
   )
}

export default PieChart