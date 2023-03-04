'use client'

import React from 'react'
import {FaMoneyCheckAlt} from 'react-icons/fa'
import {BsCreditCard2BackFill} from 'react-icons/bs'
import {IoDocumentTextOutline} from 'react-icons/io5'
import {RiArrowRightSLine} from 'react-icons/ri'
import { Transaction } from 'plaid'
import { roundValue } from '@/utils/helperFuncts'

type Props = {
   earnings: Transaction[],
   spending: Transaction[],
   bills: Transaction[]
}

const FinanceOverview = ({earnings, spending, bills}: Props) => {

   const addAmounts = (type:string) => {
      let totalSpending: number = 0
      if (type === 'earnings')
         earnings.map((item) => {
            totalSpending += Math.abs(item.amount)
         })
      else if (type === 'bills')
         bills.map((item) => {
            totalSpending += item.amount
         })
      else
         spending.map((item) => {
            totalSpending += item.amount
         })

      return (
         <p>${roundValue(totalSpending)}</p>
      )
   }

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
               {addAmounts('earnings')}
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
               {addAmounts('bills')}
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
               {addAmounts('spending')}
               <button className='group btn'>
                  <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
               </button>
            </div>
         </li>
      </ul>
   )
}

export default FinanceOverview