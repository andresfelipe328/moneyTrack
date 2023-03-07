// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/config/firebase'
import { doc, getDoc } from 'firebase/firestore'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Transaction } from 'plaid'
import {client} from '../../config/plaid'

// type Data = {
//   name: string
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const userID = req.body.userID
   const firstMonthDate = req.body.firstDate
   const lastDate = req.body.lastDate
   let spending:Transaction[] = []
   let bills:Transaction[] = []
   let earnings:Transaction[] = []
   
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

         const monthlyTranscations = await client.transactionsGet({
         access_token,
         start_date: firstMonthDate,
         end_date: lastDate,
         options: {
            account_ids: accountIDs
         }
         });
         let transactions = monthlyTranscations.data.transactions

         while(transactions.length < monthlyTranscations.data.total_transactions) {
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
         const omitCategories = ['Transfer', 'Credit Card', 'Deposit', 'Payment', 'Service']
         const billCategories = ['Service', 'Rent', 'Healthcare Services']
         transactions.reverse().forEach((transactionItem) => {
            if (!omitCategories.some((r) => transactionItem.category!.indexOf(r) >= 0) && 
                  !omitCategories.some((r) => transactionItem.name.indexOf(r) >= 0)) {
               spending.push(transactionItem)
            }
            if (billCategories.some((r) => transactionItem.category!.indexOf(r) >= 0)) {
               bills.push(transactionItem)
            }
            if (transactionItem.category!.includes('Payroll')) {
               earnings.push(transactionItem)
            }
         })
         res.status(200).json({
            spending,
            bills,
            earnings
         })
      }
      else
         res.status(400).json('fetching request encountered an error')

   } catch(err){
      console.log('More_transactions: ', err)
   }

}