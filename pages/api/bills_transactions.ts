// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/config/firebase'
import { Bill } from '@/utils/data_types'
import { doc, getDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Transaction } from 'plaid'
import {client} from '../../config/plaid'

// type Data = {
//   name: string
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const todayDate = new Date()
   const userID = req.body.userID
   const firstMonthDate = req.body.firstDate
   const lastDate = req.body.lastDate
   let transactions:Transaction[] = []
   let bills:Bill[] = []
   let totalTransactions: number = 0
   
   try {
      const linkref = doc(db, `users/${userID}/linkBankAcc`, 'linkBankAccInfo')
      const linkSnap = await getDoc(linkref)

      if (linkSnap.exists()) {
         const access_token = linkSnap.data().accessToken

         const response = await client.accountsBalanceGet({
            access_token
         });
         const accounts = response.data.accounts;
         const omitAcc = ['credit', 'loan']
         let accountIDs:string[] = []

         accounts.forEach((acc:any) => {
         if (!omitAcc.includes(acc.type)) {
            accountIDs.push(acc.account_id)
         }
         })

         // Get Automated Bills =======================================================================================
         const recurringTransactions = await client.transactionsRecurringGet({
            access_token,
            account_ids: accountIDs
         });

         let outflowStreams = recurringTransactions.data.outflow_streams;
         const billCategories = ['Service', 'Rent', 'Healthcare Services']
         outflowStreams.forEach((transaction) => {
            if (!bills.find((bill:Bill) => bill.name === transaction.merchant_name)) {
               if (billCategories.some((r) => transaction.category!.indexOf(r) >= 0)) {
                  bills.push({
                     name: transaction.merchant_name!,
                     chargeDate: transaction.last_date.replace('-', ' '),
                     amount: transaction.last_amount.amount!,
                     id: transaction.stream_id,
                     recurring: transaction.description.includes('RECURRING') ? true : false
                  })
               }
               else if (transaction.description.includes('RECURRING')) {
                  const year = todayDate.getFullYear()
                  const month = todayDate.getMonth()
                  const day = Number(transaction.description.split(' ')[1].slice(2))
                  const date = new Date(year, month, day).toISOString().slice(0,10).replace('-', ' ')
                  bills.push({
                     name: transaction.merchant_name!,
                     chargeDate: date,
                     amount: transaction.average_amount.amount!,
                     id: transaction.stream_id,
                     recurring: transaction.description.includes('RECURRING') ? true : false
                  })
               }
            }
         })
         // ===========================================================================================================

         const monthlyTranscations = await client.transactionsGet({
           access_token,
           start_date: firstMonthDate,
           end_date: lastDate,
           options: {
            // count: 10,
           }
         });

         totalTransactions = monthlyTranscations.data.total_transactions
         transactions = monthlyTranscations.data.transactions

         while(transactions.length < totalTransactions) {
            const remainingTransactions = await client.transactionsGet({
              access_token,
              start_date: firstMonthDate,
              end_date: lastDate,
              options: {
                offset: transactions.length,
              }
            });
            transactions = transactions.concat(remainingTransactions.data.transactions)
         }
         
         res.status(200).json({
            transactions: transactions,
            bills,
            totalTransactions: totalTransactions
         })
      }
      else
         res.status(400).json('fetching request encountered an error')

   } catch(err){
      console.log('More_transactions: ', err)
   }

}