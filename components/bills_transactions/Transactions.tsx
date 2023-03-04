import { Transaction } from 'plaid'
import React, { SyntheticEvent, useState } from 'react'
import TransactionItem from './TransactionItem'

type Props = {
   transactions: Transaction[],
   totalTransactions: number,
   setTransactions: Function,
   setTotalTransactions: Function
}

const TransactionsList = ({transactions, totalTransactions, setTransactions, setTotalTransactions}: Props) => {

   const todayDate = new Date()
   const [date, setDate] = useState(new Date().toISOString().slice(0,7))

   return (
      <div className="flex flex-col gap-2 h-max rounded-md bg-secondary-dark/[50%] shadow-md p-2">
         <div className='flex items-center justify-between gap-1'>
            <h3 className='text-extra-light'>Transactions</h3>
            <small className='text-extra-light'>
               {totalTransactions} transactions
            </small>
         </div>

         <ul className="w-full flex flex-col gap-4">
            {transactions?.length > 0
               ?
               transactions.map((transaction: Transaction) => {
                     return (
                        <TransactionItem key={transaction.transaction_id} transaction={transaction}/>
                     )
                  })
               :
                  <p className='mx-auto p-2'>
                     no transactions for this month
                  </p>
            }
         </ul>
      </div>
   )
}

export default TransactionsList