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
import { Transaction } from 'plaid';
import { roundValue } from '@/utils/helperFuncts';
import { ChartContent } from '@/utils/data_types';

ChartJS.register(
   ArcElement, 
   Tooltip, 
   Legend
);

type Props = {
   spending: ChartContent[]
}

const PieChart = ({spending}: Props) => {

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
         }
      }
   };

   const data = {
      labels: spending.map(label => label.label),
      datasets: [{
        data: spending.map(amount => amount.amount),
        backgroundColor: spending.map(color => color.color.color),
      }]
   };

   const currentSpending = () => {
      let totalSpending: number = 0
      spending.map((item) => {
         totalSpending += item.amount
      })

      return (
         <p>${roundValue(totalSpending)}</p>
      )
   }

   return (
      <div className='relative h-[15rem]'>
         {/* <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10'>
            <BsCreditCard2BackFill className='icon text-xl mx-auto'/>
            <p>Monthly Spending:</p>
            {currentSpending()}
         </div> */}
         <Doughnut data={data} options={options}/>
      </div>
   )
}

export default PieChart