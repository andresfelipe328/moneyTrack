import { Bill } from '@/utils/data_types'
import { roundValue } from '@/utils/helperFuncts'
import React from 'react'
import TxnMore from '../popups/TxnMore'

const BillItem = ({bill}: {bill:Bill}) => {
   return (
      <li className="flex items-center justify-between gap-10 p-2 rounded-md bg-primary-dark/[25%] hover:simple-hover">
         <div className="flex gap-2">
         <div className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-500">
            <h1>{bill.name[0]}</h1>
         </div>
         <div className="flex flex-col">
            <h2 className="font-bold">{bill.name}</h2>
            <small>{bill.chargeDate.replace(' ', '-')}</small>
         </div>
         </div>

         <div className="flex gap-4 items-center">
            <p className="font-medium">${roundValue(bill.amount)}</p>
            <TxnMore/>
         </div>
      </li>
   )
}

export default BillItem