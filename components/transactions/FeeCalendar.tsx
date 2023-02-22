'use client'

import { useState} from 'react'
import { differenceInCalendarDays } from 'date-fns';

import {GoPrimitiveDot} from 'react-icons/go'

import Calendar from 'react-calendar';

const FeeCalendar = () => {
   const [value, setValue] = useState(new Date())

   const isSameDay = (a:Date, b:Date) => {
      return differenceInCalendarDays(a,b) === 0
   }

   const tileContent = ({date, view}:any) => {
      if (view === 'month' && isSameDay(value, date))
         return <GoPrimitiveDot className='absolute top-[.05rem] right-[.05rem] text-secondary-light z-20'/>
      return null
   }

   const tileClassname = ({activeStartDate, date, view}:any) => {
      const currDate = new Date()
      if (view === 'month' && isSameDay(currDate, date))
         return 'highlight';
      return null
   }

   return (
      <div>
         <Calendar 
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