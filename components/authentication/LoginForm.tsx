import Link from 'next/link'
import { useRouter } from 'next/router'
import { FormEvent, useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

import { BiLogIn } from "react-icons/bi"
import { FaUnlockAlt, FaUser, FaUserPlus } from "react-icons/fa"

const LoginForm = () => {

   const {login} = useAuth()
   const [email, setEmail] = useState('')
   const [pwd, setPwd] = useState('')
   const [err, setErr] = useState('')
   const router = useRouter()

   useEffect(() => {
      setErr('')
   },[email, pwd])

   const handleLogin = async (e:FormEvent) => {
      e.preventDefault()
      try {
         await login(email, pwd)
         router.push('/')
      } catch(err:any) {
         setErr(err.message)
      }
   }

   return (
      <form className='flex flex-col gap-5 items-center min-w-[20rem]' onSubmit={handleLogin}>

         <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="email" className='text-secondary-light'>Email:</label>
            <div className='flex flex-row-reverse items-center gap-4'>
               <input 
                  type="email" 
                  name='email'
                  placeholder='example@email.com'
                  className='peer w-full'
                  required
                  onChange={(e) => setEmail(e.target.value)}
               />
               <FaUser className='icon peer-focus:scale-150 text-extra-light transition-transform duration-200 ease-in-out'/>
            </div>
         </div>

         <div className='flex flex-col gap-1 w-full'>
            <label htmlFor="email" className='text-secondary-light'>Password:</label>
            <div className='flex flex-row-reverse items-center gap-4'>
               <input
                  type="password"
                  name="pwd"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className='peer w-full'
                  required
                  onChange={(e) => setPwd(e.target.value)}
               />
               <FaUnlockAlt className='icon peer-focus:scale-150 text-extra-light transition-transform duration-200 ease-in-out'/>
            </div>
         </div>

         {err ?
               <p className='bg-red-500/70 p-2 rounded-md'>{err}</p>
            :
               <button 
               className='group btn py-2 px-4 flex items-center justify-between bg-extra-light disabled:opacity-50 w-[65%] mx-auto'
               disabled={!email || !pwd ? true : false}
               >
                  <p className='text-secondary-dark group-hover:text-extra-light transition duration-300 ease-in-out'>Login</p>
                  <BiLogIn className='text-lg text-secondary-dark group-hover:text-extra-light transition duration-300 ease-in-out'/>
               </button>
         }

         <div className='w-full flex flex-col gap-2 items-center'>
            <p className='text-dark_2 dark:text-light_1 font-semibold'>
               not registered:
            </p>
            <Link href='/sign-up' className='w-[75%]'>
               <button className='group btn py-2 px-4 flex items-center justify-between bg-extra-light w-[75%] mx-auto'>
                  <p className='text-secondary-dark group-hover:text-extra-light transition duration-300 ease-in-out'>Sign Up</p>
                  <FaUserPlus className='text-lg text-secondary-dark group-hover:text-extra-light transition duration-300 ease-in-out'/>
               </button>
            </Link>
         </div>
      </form>
   )
}

export default LoginForm