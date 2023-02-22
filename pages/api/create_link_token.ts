// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {client} from '../../config/plaid'

// type Data = {
//   name: string
// }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const configs:any = {
      user: {
         client_user_id: 'someid12345',
      },
      client_name: 'moneytrack',
      products: ['transactions'],
      country_codes: ['US'],
      language: 'en',
   };
   try {
      const createTokenResponse = await client.linkTokenCreate(configs);
      res.status(200).json(createTokenResponse.data)

   } catch(err){
      console.log('Create_link_token: ', err)
   }

}