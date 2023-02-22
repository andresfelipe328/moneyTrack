import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);
import { Transaction } from '@/utils/data_types';

const AreaGraph = ({spending}: {spending: Transaction[]}) => {
   const labels = () => {
      const setLabels: string[] = []
      spending.forEach((item) => {
         setLabels.push(item.date)
      })
      return setLabels
   }

   const dataPoints = () => {
      const setDataPoints:number[] = []
      spending.forEach((item) => {
         setDataPoints.push(item.amount)
      })
      return setDataPoints
   }

   const options:any = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
         y: {
            display: false,
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
            display: false,
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
            display: false
         },
         tooltip: {
            padding: 8,
            boxPadding: 3,
            callbacks: {
               label: (ctx: any) => {
                  let label = ctx.raw;
                  console.log(label)
                  return [`${spending[ctx.dataIndex].name}: `, `$${label}`]
               }
            }
         }
      }
   };

   const data:any = {
      labels: labels(),
      datasets: [
         {
            // labels: ['Jan', 'Feb', 'March'],
            fill: true,
            tension: .3,
            data: dataPoints(),
            pointBackgroundColor: '#333533',
            pointBorderColor: 'rgba(245, 203, 92, .5)',
            pointBorderWidth: 2,
            pointRadius: 5,
            // pointRadius: (ctx:any) => {
            //    const pointLength = ctx.chart.data.datasets[0].data.length - 1
            //    const pointsArr = []

            //    for (let i = 0; i <= pointLength; ++i) {
            //       if (i === pointLength)
            //          pointsArr.push(5)
            //       else
            //          pointsArr.push(0)
            //    }
            //    return pointsArr
            // },
            borderColor: '#F5CB5C',
            backgroundColor: '#F5CB5C',
         },
         // {
         //    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July'],
         //    fill: true,
         //    tension: .3,
         //    data: [120,270,300,610,900,547,234],
         //    pointRadius: 0,
         //    borderColor: 'rgba(53, 162, 235, 0.25)',
         //    backgroundColor: 'rgba(53, 162, 235, 0.25)',
         // },
      ],
   };

   const currentSpending = () => {
      let totalSpending = 0
      spending.map((item) => {
         totalSpending += item.amount
      })

      return (
         <p>${totalSpending}</p>
      )
   }

   return (
      <>
         <h2 className="text-extra-light w-max">
            Current Spending: {currentSpending()}
         </h2>
         <div className='h-[10rem]'>
            <Line options={options} data={data} />
         </div>
      </>
   )
}

export default AreaGraph