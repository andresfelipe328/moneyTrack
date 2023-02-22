import React, {useState, useEffect} from 'react'
import {
   usePlaidLink,
   PlaidLinkOptions,
   PlaidLinkOnSuccess,
} from 'react-plaid-link';

import {BsBank2} from 'react-icons/bs'
import { useRouter } from 'next/router';

type Props = {
   userID: string
}

const LinkBank = ({userID}: Props) => {

   const [linkToken, setLinkToken] = useState(null);
   const router = useRouter()
   const generateToken = async () => {
      const response = await fetch('/api/create_link_token', {
         method: 'POST',
      });
      const data = await response.json();
      console.log(data)
      setLinkToken(data.link_token);
   };
   useEffect(() => {
      generateToken();
   }, []);

   const onSuccess = React.useCallback((public_token:string, metadata:any) => {
      const response = fetch('/api/set_access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ public_token, userID}),
      });
      router.push('/')
    }, []);

   const config: Parameters<typeof usePlaidLink>[0] = {
      token: linkToken,
      onSuccess,
    };
   const {open, ready} = usePlaidLink(config)

   return (
      <button onClick={() => open()} className='group btn py-2 px-4 flex items-center gap-4 bg-extra-light mx-auto mt-5'>
         <BsBank2 className='text-primary-dark text-5xl group-hover:text-extra-light transition duration-300 ease-in-out'/>
         <p className='text-primary-dark group-hover:text-extra-light transition duration-300 ease-in-out'>Link Bank Account</p>
      </button>
   )
}

export default LinkBank