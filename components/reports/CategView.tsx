import React from 'react'

import { FaHospitalAlt } from 'react-icons/fa'
import { RiArrowRightSLine } from 'react-icons/ri'
import {BiCameraMovie} from 'react-icons/bi'

import ViewLayout from './ViewLayout'
import { ChartContent } from '@/utils/data_types'
import { roundValue } from '@/utils/helperFuncts'

type Props = {
   spending: ChartContent[]
}

const CategView = ({spending}: Props) => {
   return (
      <ViewLayout>
         {spending.length === 0

            ?
               <div className='flex items-center justify-center p-2'>
                  <p>no spending detected...</p>
               </div>
            :
               spending.map((spendCateg, i) => (
                  <li key={i} className='flex items-center justify-between gap-2 hover:simple-hover p-2 rounded-md'>
                     <div className='flex items-center gap-2'>
                        <div 
                           className='p-2 w-10 h-10 flex items-center justify-center rounded-full border-2 border-secondary-light'
                           style={{backgroundColor: spendCateg.color.color}}
                        >
                           <p className={spendCateg.color.isLight ? 'text-primary-dark' : `text-primary-light`}>
                              {spendCateg.label[0]}
                           </p>
                        </div>
                        <p>{spendCateg.label}:</p>
                     </div>

                     <div className='flex items-center gap-2'>
                        <p>${roundValue(spendCateg.amount)}</p>
                        {/* <button className='group btn'>
                           <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
                        </button> */}
                     </div>
                  </li>
               ))
         }
      </ViewLayout>
   )
}

export default CategView