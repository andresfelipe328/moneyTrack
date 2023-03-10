import Head from 'next/head'

import BasicLayout from '@/components/layouts/BasicLayout'
import NotificationItem from '@/components/notifications/NotificationItem'

import nookies from 'nookies'
import { verifyIDToken } from '@/config/firebaseadmin'
import { GetServerSidePropsContext } from 'next'

export default function Notifications() {
  return (
    <>
      <Head>
        <title>Notifications</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicLayout>
         <h1>Notifications</h1>
         <ul className="w-[75%] sm-width:w-full mx-auto">
            <NotificationItem/>
         </ul>
      </BasicLayout>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
     const cookies = nookies.get(ctx)
     const token = await verifyIDToken(cookies.token)
     
     return {
      props: {}
   }

  } catch(err) {
      return {
        redirect: {destination: '/login'}
      }
  }
}