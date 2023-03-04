import React from 'react'
import { Transaction } from 'plaid'

import TxnMore from '../popups/TxnMore'
import { roundValue } from '@/utils/helperFuncts'

const TransactionItem = ({transaction}: {transaction:Transaction}) => {
   return (
      <li className="overflow-hidden flex items-center gap-10 p-2 rounded-md bg-primary-dark/[25%] hover:simple-hover">
         <div className="flex flex-col flex-1 truncate">
            <h2 className="font-bold truncate">{transaction.merchant_name || transaction.name}</h2>
            <div className='flex items-center gap-2'>
               <small>{transaction.date}</small>
               <small 
                  className={`py-1 px-3 rounded-md shadow-simple-shadow border-2 border-primary-dark text-secondary-light/100`}
                  style={{backgroundColor: !transaction.pending ? 'rgba(21,128,61, .5)' :'rgba(185,28,28,.5)'}}
               >
                  {transaction.pending ? 'pending' : 'settled'}
               </small>
            </div>
         </div>

         <div className="flex gap-4 items-center">
            <p className="font-medium">${roundValue(transaction.amount)}</p>
            <TxnMore/>
         </div>
      </li>
   )
}

export default TransactionItem