import React from 'react'

import TxnMore from '../popups/TxnMore'

const TransactionItem = () => {
   return (
      <li className="flex items-center justify-between gap-10 p-2 rounded-md bg-primary-dark/[25%] hover:simple-hover">
         <div className="flex gap-2">
         <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-500">
            <h1>n</h1>
         </div>
         <div className="flex flex-col">
            <h2 className="font-bold">Netflix</h2>
            <small>11/12/23 4:44:23</small>
         </div>
         </div>

         <div className="flex gap-4 items-center">
            <p className="font-medium">$15.99</p>
            <TxnMore/>
         </div>
      </li>
   )
}

export default TransactionItem