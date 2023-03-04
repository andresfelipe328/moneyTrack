import React from 'react'
import { RiArrowRightSLine } from 'react-icons/ri'
import { Subscription } from '@/utils/data_types'
import { roundValue } from '@/utils/helperFuncts'

const Subscriptions = ({subscriptions}: {subscriptions: Subscription[]}) => {
   return (
      <div className='flex flex-col items-center gap-2 h-full'>
         { subscriptions.length === 0 
            ?
            <p> You have no Subscriptions </p>
            :
            <>
               <div className='flex items-center gap-2'>
                  <div className='grid place-items-center text-3xl text-extra-light w-12 h-12 rounded-3xl border-2 border-extra-light'>
                     <p className='text-3xl text-extra-light'>1</p>
                  </div>
                  <h3>Subscriptions</h3>
               </div>

               <ul className='flex flex-col gap-2 w-full'>
                  {subscriptions.map((subscription:Subscription) => (
                     <li key={subscription.id} className="flex items-center justify-between gap-10 p-2 rounded-md bg-primary-dark/[25%] hover:simple-hover">
                        <div className="flex gap-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-500">
                           <h1>{subscription.name[0]}</h1>
                        </div>
                        <div className="flex flex-col">
                           <h2 className="font-bold">{subscription.name}</h2>
                           <small>Since {subscription.firstDate}</small>
                        </div>
                        </div>

                        <div className="flex gap-4 items-center">
                           <p className="font-medium">${roundValue(subscription.amount)}</p>
                           <button className='group btn'>
                              <RiArrowRightSLine className='icon text-xl group-hover:text-extra-light'/>
                           </button>
                        </div>
                     </li>
                  ))
                  }
               </ul>
            </>
         }
      </div>
   )
}

export default Subscriptions