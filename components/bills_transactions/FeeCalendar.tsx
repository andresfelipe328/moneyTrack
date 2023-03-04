'use client'

import { useState} from 'react'
import { differenceInCalendarDays } from 'date-fns';

import {GoPrimitiveDot} from 'react-icons/go'

import Calendar from 'react-calendar';
import { Bill } from '@/utils/data_types';
import Swal from 'sweetalert2';
import { roundValue } from '@/utils/helperFuncts';

const FeeCalendar = ({bills}: {bills:Bill[]}) => {
   const [value, setValue] = useState(new Date())
   const currDate = new Date()
   const dayList = bills.map(bill => {
      if (bill.recurring)
         return new Date(bill.chargeDate).getDate()
   })

   const isSameDay = (a:Date, b:Date) => {
      return differenceInCalendarDays(a,b) === 0
   }

   const tileContent = ({date, view}:{date: Date, view:string}) => {
      const dispDate = date.getDate()
      if (view === 'month' && dayList.includes(dispDate))
         return <GoPrimitiveDot className='absolute top-[.05rem] right-[.05rem] text-secondary-light z-20'/>
      return null
   }

   const tileClassname = ({activeStartDate, date, view}:any) => {
      if (view === 'month' && isSameDay(currDate, date))
         return 'highlight';
      return null
   }

   const showBill = (value: Date) => {
      const billList = bills.filter((bill:Bill, i:number) => {
         const date = new Date(bill.chargeDate).getDate()

         if (value.getDate() === date) {
            return bill
         }
         return null
      })
      
      if (billList.length > 0)
         Swal.fire({
            title: `<h2 class='modual-title'>Bill Information (${value.toISOString().slice(0,10)}):</h2>`,
            html: billList.map((bill:Bill) => (
               "<div class='bill-container'>" +
                  `<h3 class='bill-name'>${bill.name}</h3>` +
                  `<p class='bill-amount'>$${roundValue(bill.amount)}</p>` +
               "</div>"
            )),
            showConfirmButton: false,
            background: '#F5CB5C',
            padding: '2rem',
         })
   }

   return (
      <div className='flex justify-center w-full'>
         <Calendar
            onClickDay={showBill}
            onChange={setValue} 
            value={value} 
            tileContent={tileContent} 
            tileClassName={tileClassname}
            minDetail="month"
            next2Label={null}
            prev2Label={null}
         />
      </div>
   )
}

export default FeeCalendar