import React from 'react'

import { FaHospitalAlt } from 'react-icons/fa'
import { RiArrowRightSLine } from 'react-icons/ri'
import {BiCameraMovie} from 'react-icons/bi'
import {MdFastfood} from 'react-icons/md'

import ViewLayout from './ViewLayout'

const BudgetView = () => {
   return (
      <ViewLayout>
         <>
            <li className='flex items-center justify-between gap-2 hover:simple-hover p-2 rounded-md'>
               <div className='flex items-center gap-2'>
                  <div className='p-2 rounded-full border-2 border-secondary-light'>
                     <FaHospitalAlt className='icon text-2xl'/>
                  </div>
                  <p>Healthcare:</p>
               </div>

               <div className='flex items-center gap-2'>
                  <p>$850</p>
                  <button className='group btn'>
                     <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
                  </button>
               </div>
            </li>
            <li className='flex items-center justify-between gap-2 hover:simple-hover p-2 rounded-md'>
               <div className='flex items-center gap-2'>
                  <div className='p-2 rounded-full border-2 border-secondary-light'>
                     <BiCameraMovie className='icon text-2xl'/>
                  </div>
                  <p>Recreation:</p>
               </div>

               <div className='flex items-center gap-2'>
                  <p>$600</p>
                  <button className='group btn'>
                     <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
                  </button>
               </div>
            </li>
            <li className='flex items-center justify-between gap-2 hover:simple-hover p-2 rounded-md'>
               <div className='flex items-center gap-2'>
                  <div className='p-2 rounded-full border-2 border-secondary-light'>
                     <MdFastfood className='icon text-2xl'/>
                  </div>
                  <p>Food & Drinks:</p>
               </div>

               <div className='flex items-center gap-2'>
                  <p>$350</p>
                  <button className='group btn'>
                     <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
                  </button>
               </div>
            </li>
         </>
      </ViewLayout>
   )
}

export default BudgetView