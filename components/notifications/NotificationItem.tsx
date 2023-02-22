'use client'

import React from 'react'
import NotifMore from '../popups/NotifMore'

const NotificationItem = () => {
   return (
      <li className="flex p-2 rounded-md items-center justify-between gap-4 bg-secondary-dark/[25%] simple-hover">
         <div className="flex gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-500">
               <h1>$</h1>
            </div>
            <div className="flex flex-col">
               <p>Upcoming payment</p>
               <small>11/12/23</small>
            </div>
         </div>

         <div className='flex items-center gap-2'>
            <p>$34.55</p>
            <NotifMore/>
         </div>
      </li>
   )
}

export default NotificationItem