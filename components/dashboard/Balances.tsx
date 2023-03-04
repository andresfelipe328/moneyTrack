import React from 'react'
import { Account } from '@/utils/data_types'

type Props = {
   accounts: Account[]
}

const Balances = ({accounts}: Props) => {

   const creditAvailable = (acc:Account) => {
      return (
         <small className='text-extra-light'>
            ${(acc.balances.limit && acc.balances?.current) && acc.balances.available} available 
         </small>
      )
   }

   const creditCardBar = (curr:number | null, limit: number | null) => {
      if (curr && limit) {
         const width = Math.round((curr / limit) * 100) + '%'

         return (
            <div className='rounded-md h-full bg-extra-light' style={{width: width}}></div>
         )
      }
   }

   return (
      <>
         { accounts && accounts.map((acc) => (
               <li key={acc.account_id} className="flex flex-col gap-1 p-2 rounded-md bg-primary-dark/[25%]">
                  <div className="flex items-center justify-between gap-4">
                     <h3>{acc.name}</h3>
                     <p>${acc.balances?.available}</p>
                  </div>
                  {acc.type === 'credit' && 
                     <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-between'>
                           <small className='text-extra-light'>
                              Total Credit Available: ${acc.balances.limit}
                           </small>
                           <small className='text-extra-light'>
                              ${acc.balances.available} available 
                           </small>
                        </div>
                        <div className='rounded-md h-3 w-full p-1 bg-secondary-light/20 '>
                           {creditCardBar(acc.balances?.current, acc.balances.limit)}
                        </div>
                     </div>
                  }
               </li>
            ))
         }
      </>
  )
}

export default Balances