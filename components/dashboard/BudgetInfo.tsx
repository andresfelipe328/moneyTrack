import React, { useState } from 'react'
import {
   Chart as ChartJS,
   Tooltip,
   Legend,
   ArcElement
 } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { FaHospitalAlt, FaPlus } from 'react-icons/fa';
import { BiCameraMovie } from 'react-icons/bi';
import { MdFastfood } from 'react-icons/md';

ChartJS.register(
   ArcElement, 
   Tooltip, 
   Legend
);

type Props = {
   budgets: {
      // name: string,
      // amount: number,
      // currSpent: number
   }
}

const BudgetInfo = ({budgets}: Props) => {
   const options:any = {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '85%',
      datasets: {
         doughnut: {
            borderWidth: 2,
            borderColor: 'rgba(36, 36, 35, .8)',
         }
      },
      elements: {
         arc: {
            borderRadius: 50,
            borderWidth: 2,
            hoverBorderWidth: 5,
         }
      },
      plugins: {
         legend: {
            display: false
         },
         tooltip: {
            callbacks: {
               label: (ctx: any) => {
                  const percentage = 270 / ctx.dataset.data[0] * 100
                  return percentage + '%'
               }
            }
         },
         title: {
            display: false,
         },
      }
   };

   const data = {
      datasets: [{
        data: [300],
        circumference: 270,
        backgroundColor: [
          '#F5CB5C',
        ],
      }]
   };

   const bgCircle:any = {
      id: 'bgCircle',
      beforeDatasetsDraw(chart:any, args:any, pluginOptions:any) {
         const {ctx} = chart
         ctx.save()

         const xCoor = chart.getDatasetMeta(0).data[0].x 
         const yCoor = chart.getDatasetMeta(0).data[0].y 
         const innerRadius = chart.getDatasetMeta(0).data[0].innerRadius
         const outerRadius = chart.getDatasetMeta(0).data[0].outerRadius
         const width = outerRadius - innerRadius
         const angle = Math.PI / 180

         ctx.beginPath()
         ctx.lineWidth = width
         ctx.strokeStyle = 'rgba(224, 225, 221, .5)'
         ctx.arc(xCoor, yCoor, outerRadius - width / 2, 0, angle * 360, false)
         ctx.stroke()
      }
   }

   const [budgetType, setBudgetType] = useState('Everything Else')

   return (
      <div className='flex flex-col items-center gap-4 rounded-md bg-secondary-dark/[50%] shadow-md p-2'>
         { budgets
            ?
               <>
                  <div className='flex items-center gap-4'>
                  <div className='relative h-[8rem] w-[8rem]'>
                     <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center -z-10'>
                        <p>Budget:</p>
                        <p>$9,575</p>
                     </div>
                     <Doughnut data={data} options={options} plugins={[bgCircle]}/>
                  </div>
                  <div className='flex flex-col gap-1'>
                     <h2 className='text-extra-light'>Left for Spending:</h2>
                     <p>$2,450</p>
                     <small>on <span className='text-extra-light text-sm'>{budgetType}</span></small>
                  </div>
                  </div>

                  <div className='flex items-center justify-center gap-2'>
                     <button 
                        onClick={()=>setBudgetType('Everything Else')} 
                        className={`group w-[2.5rem] h-[2.5rem] grid place-items-center rounded-full border-2 ${budgetType === 'Everything Else' ? 'bg-primary-dark shadow-btn-shadow' : 'bg-extra-light'} border-primary-dark btn`}
                     >
                        <small 
                           className={`group-hover:text-extra-light ${budgetType === 'Everything Else' ? 'text-extra-light' : 'text-primary-dark'} transition-all duration-300 ease-in-out`}
                        >
                           All
                        </small>
                     </button>
                     
                     <button 
                        onClick={()=>setBudgetType('Healthcare')} 
                        className={`group p-2 rounded-full border-2 border-primary-dark btn ${budgetType === 'Healthcare' ? 'bg-primary-dark shadow-btn-shadow' : 'bg-extra-light'}`}
                     >
                        <FaHospitalAlt 
                           className={`icon text-xl ${budgetType === 'Healthcare' ? 'text-extra-light' : 'text-primary-dark'} group-hover:text-extra-light transition-all duration-300 ease-in-out`}
                        />
                     </button>

                     <button 
                        onClick={()=>setBudgetType('Recreation')} 
                        className={`group p-2 rounded-full border-2 border-primary-dark btn ${budgetType === 'Recreation' ? 'bg-primary-dark shadow-btn-shadow' : 'bg-extra-light'}`}
                     >
                        <BiCameraMovie 
                           className={`icon text-xl ${budgetType === 'Recreation' ? 'text-extra-light' : 'text-primary-dark'} group-hover:text-extra-light transition-all duration-300 ease-in-out`}
                        />
                     </button>

                     <button 
                        onClick={()=>setBudgetType('Food & Drinks')} 
                        className={`group p-2 rounded-full border-2 border-primary-dark btn ${budgetType === 'Food & Drinks' ? 'bg-primary-dark shadow-btn-shadow' : 'bg-extra-light'}`}
                     >
                        <MdFastfood 
                           className={`icon text-xl ${budgetType === 'Food & Drinks' ? 'text-extra-light' : 'text-primary-dark'} group-hover:text-extra-light transition-all duration-300 ease-in-out`}
                        />
                     </button>
                  </div>
               </>
            :
               <>
               <h2 className="bg-primary-dark py-2 px-4 rounded-md shadow-label w-fit text-extra-light">
                  you have no budgets
               </h2>
               <button className='group rounded-full p-5 bg-primary-dark hover:bg-extra-light btn'>
                  <FaPlus className='text-extra-light text-3xl group-hover:text-primary-dark transition-all duration-300 ease-in-out'/>
               </button>
               </>
         }
      </div>
   )
}

export default BudgetInfo