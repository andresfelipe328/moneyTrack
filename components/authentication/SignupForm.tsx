import { useRouter } from 'next/router'
import { FormEvent, useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthContext'

import { FaTimesCircle, FaUnlockAlt, FaUser, FaUserPlus } from "react-icons/fa"
import { BsFillCheckCircleFill } from 'react-icons/bs'

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/

const SignupForm = () => {
   const {signup} = useAuth()
   const [email, setEmail] = useState('')

   const [pwd, setPwd] = useState('')
   const [confirmPWd, setConfirmPwd] = useState('')
   const [matchPwds, setMatchPwds] = useState(false)
   const [validPwd, setValidPwd] = useState(false)

   const [err, setErr] = useState('')
   const router = useRouter()

   useEffect(() => {
      const validResult = PWD_REGEX.test(pwd)
      setValidPwd(validResult)
      const match = pwd === confirmPWd
      setMatchPwds(match)
   }, [pwd, confirmPWd])

   useEffect(() => {
      setErr('')
   },[email, pwd, confirmPWd])

   const handleSignup = async (e:FormEvent) => {
      e.preventDefault()
      try {
         await signup(email, pwd)
         router.push('/link-bank-account')
      } catch(err:any) {
         setErr(err.message)
      }
   }

   return (
      <form className='flex flex-col gap-5 items-center min-w-[20rem]' onSubmit={handleSignup} autoComplete='off'>

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
            <div className='flex items-center gap-2'>
               {pwd ? (validPwd ? <BsFillCheckCircleFill className="text-green-700"/> : <FaTimesCircle className="text-red-700"/>) : null}
               <label htmlFor="email" className='text-secondary-light'>Password:</label>
            </div>
            <small className='text-extra-light'>Password must have lower & upercase letters with special characters</small>
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

         <div className='flex flex-col gap-1 w-full'>
            <div className='flex items-center gap-2'>
               { pwd ? (matchPwds && validPwd ? <BsFillCheckCircleFill className="text-green-700"/> : <FaTimesCircle className="text-red-700"/>) : null}
               <label htmlFor="email" className='text-secondary-light'>Confirm Password:</label>
            </div>
            <div className='flex flex-row-reverse items-center gap-4'>
               <input
                  type="password"
                  name="pwd"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  className='peer w-full'
                  required
                  onChange={(e) => setConfirmPwd(e.target.value)}
               />
               <FaUnlockAlt className='icon peer-focus:scale-150 text-extra-light transition-transform duration-200 ease-in-out'/>
            </div>
         </div>

         {err ?
               <p className='bg-red-500/70 p-2 rounded-md'>{err}</p>
            :
               <button 
               className='group btn py-2 px-4 flex items-center justify-between bg-extra-light disabled:opacity-50 w-[75%] mx-auto'
               disabled={((!email || !pwd || !confirmPWd) || (!validPwd || !matchPwds)) ? true : false}
               >
                  <p className='text-secondary-dark group-hover:text-extra-light transition duration-300 ease-in-out'>Signup</p>
                  <FaUserPlus className='text-lg text-secondary-dark group-hover:text-extra-light transition duration-300 ease-in-out'/>
               </button>
         }
      </form>
   )
}

export default SignupForm