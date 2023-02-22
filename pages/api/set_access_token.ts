// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from '@/config/firebase';
import { doc, setDoc } from 'firebase/firestore';
import type { NextApiRequest, NextApiResponse } from 'next'
import {client} from '../../config/plaid'

type Data = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
   const publicToken = req.body.public_token
   const userID = req.body.userID
   try {
      const response = await client.itemPublicTokenExchange({
         public_token: publicToken,
      });

      const accessToken = response.data.access_token;
      const itemID = response.data.item_id;

      setDoc(doc(db, `users/${userID}/linkBankAcc`, 'linkBankAccInfo'), {
         accessToken: accessToken,
         itemID: itemID
      })

      res.status(200).json({message: 'complete public token exchange'})

   } catch(err){
      console.log('Create_link_token: ', err)
   }

}