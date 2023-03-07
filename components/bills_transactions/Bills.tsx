import { Bill } from '@/utils/data_types'
import React from 'react'
import BillItem from './BillItem'

const Bills = ({bills}: {bills: Bill[]}) => {
   return (
      <div className="flex flex-col gap-2 h-max rounded-md bg-secondary-dark/[50%] shadow-md p-2">
         <h3 className="bg-primary-dark py-2 px-4 rounded-md shadow-label w-fit text-extra-light">Recurring Bills</h3>
         <ul className="w-full flex flex-col gap-4">
            {bills?.length > 0
               ?
                  bills.map((bill: Bill) => {
                     return (
                        <BillItem key={bill.id} bill={bill}/>
                     )
                  })
               :
                  <p className='mx-auto p-2'>
                     no bills for this month
                  </p>
            }
         </ul>
         { bills.length > 0 && bills.length > 5 &&
            <button className="group btn bg-secondary-light/60 hover:bg-extra-light flex items-center justify-center w-[40%] mx-auto shadow-btn-shadow">
               <p className="text-secondary-dark group-hover:text-secondary-dark transition-all duration-300 ease-in-out">more</p>
            </button>
         }
      </div>
   )
}

export default Bills