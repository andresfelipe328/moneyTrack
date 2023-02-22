import React from 'react'
import { Oswald } from '@next/font/google'
import Navbar from '../navbar/Navbar'
import { AuthContextProvider } from '@/context/AuthContext'
const oswald = Oswald({ subsets: ['latin'] })

const MainLayout = ({children}: {children: React.ReactNode}) => {
   return (
      <AuthContextProvider>
         <main className={`${oswald.className} bg-primary-dark h-screen`}>
            <div className='flex flex-col gap-4 h-screen max-w-7xl mx-auto p-2'>
               <Navbar/>
               {children}
            </div>
         </main>
      </AuthContextProvider>
   )
}

export default MainLayout