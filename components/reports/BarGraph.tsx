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
import { Transaction } from 'plaid';
import { roundValue } from '@/utils/helperFuncts';

ChartJS.register(
   CategoryScale,
   LinearScale,
   BarElement,
   Title,
   Tooltip,
   Legend
);

type Props = {
   spending: Transaction[],
   earnings: Transaction[],
   date: string
}

const BarGraph = ({spending, earnings, date}: Props) => {
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
   
   const addAmounts = (type:string) => {
      let totalSpending: number = 0
      if (type === 'earnings')
         earnings.map((item) => {
            totalSpending += Math.abs(item.amount)
         })
      else
         spending.map((item) => {
            totalSpending += item.amount
         })

      return roundValue(totalSpending)
   }

   const data = {
      labels: [date],
      datasets: [
         {
            label: 'Earned',
            data: [addAmounts('earnings')],
            backgroundColor: '#F5CB5C',
            borderColor: '#333533',
            borderWidth: 1,
            borderRadius: 12,
         },
         {
            label: 'Spent',
            data: [addAmounts('spending')],
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