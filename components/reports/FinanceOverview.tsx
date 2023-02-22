'use client'

import React from 'react'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import {BsCreditCard2BackFill} from 'react-icons/bs'
import {IoDocumentTextOutline} from 'react-icons/io5'
import {RiArrowRightSLine} from 'react-icons/ri'

const FinanceOverview = () => {
   return (
      <ul className='flex flex-col justify-center mx-auto w-[75%] sm-width:w-full'>

         <li className='flex items-center justify-between gap-2 hover:simple-hover p-2 rounded-md'>
            <div className='flex items-center gap-2'>
               <div className='p-2 rounded-md shadow-label bg-green-400/[.75]'>
                  <FaMoneyCheckAlt className='icon text-3xl'/>
               </div>
               <p>Current Earnings:</p>
            </div>

            <div className='flex items-center gap-2'>
               <p>$5,500</p>
               <button className='group btn'>
                  <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
               </button>
            </div>
         </li>

         <li className='flex items-center justify-between gap-2 hover:simple-hover p-2 rounded-md'>
            <div className='flex items-center gap-2'>
               <div className='p-2 rounded-md shadow-label bg-red-400/[.75]'>
                  <IoDocumentTextOutline className='icon text-3xl'/>
               </div>
               <p>Bills Paid:</p>
            </div>

            <div className='flex items-center gap-2'>
               <p>$1,734</p>
               <button className='group btn'>
                  <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
               </button>
            </div>
         </li>
         
         <li className='flex items-center justify-between gap-2 hover:simple-hover p-2 rounded-md'>
            <div className='flex items-center gap-2'>
               <div className='p-2 rounded-md shadow-label bg-blue-400/[.75]'>
                  <BsCreditCard2BackFill className='icon text-3xl'/>
               </div>
               <p>Current Spending:</p>
            </div>

            <div className='flex items-center gap-2'>
               <p>$800</p>
               <button className='group btn'>
                  <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
               </button>
            </div>
         </li>
      </ul>
   )
}

export default FinanceOverview