'use client'

import {useEffect, useState, useRef} from 'react'
// import {useSession} from 'next-auth/react'
// import {signOut} from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { useAuth } from '@/context/AuthContext'

import {FaBell,FaListUl,FaChartBar} from 'react-icons/fa'
import {IoSettingsSharp} from 'react-icons/io5'
import {RiDashboardFill} from 'react-icons/ri'
import DropNavBar from './DropNavBar'

const NAVLINKS = [
   {
      icon: RiDashboardFill,
      href: '/'
   },
   // {
   //    icon: FaBell,
   //    href: '/notifications'
   // },
   {
      icon: FaListUl,
      href: '/bills-transactions'
   },
   {
      icon: FaChartBar,
      href: '/reports'
   },
   {
      icon: IoSettingsSharp,
      href: '/settings'
   },
]

const Navbar = () => {

   const {logout, user} = useAuth()
   const router = useRouter()
   const [showMenu, setShowMenu] = useState(false)
   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth > 470) {
            setShowMenu(false)
         }
      }

      window.addEventListener('resize', handleResize)

      return () => {
         window.removeEventListener('resize', handleResize)
      }
   }, [])

   const handleSignOut = async () => {
      await logout()
      router.push('/login')
   }

   const ref = useRef<HTMLElement>(null)
   useEffect(() => {
      gsap.from(ref.current,
         {opacity:1, duration: .5, autoAlpha:0}
      )

      gsap.fromTo(ref.current!.childNodes, 
         {opacity: 0, y: 5},
         {duration: .25, y:0, opacity: 1, delay: .05, ease: "power1.out"}  
      )
   }, [])

   return (
      <nav className='flex items-start justify-between z-30 invisible rounded-md shadow-md p-2' ref={ref}>
         <Image
            src='/icon.svg'
            width={28}
            height={28}
            className='w-[5rem]'
            alt='payTrack'
            priority
         />

         <div className='items-center gap-2 origin-right flex mobile:hidden'>
            <h1 className='text-extra-light'>moneytrack</h1>

            {user &&
               <button onClick={handleSignOut} className='border-2 border-extra-light/60 rounded-md group btn'>
                  <p className='text-extra-light'>logout</p>
               </button>
            }

            <ul className='flex items-center pl-1 border-l-2 border-l-extra-light'>
               {NAVLINKS.map((link, i) => (
                  <Link href={link.href} key={i} className='group btn'>
                     <link.icon className='icon group-hover:text-extra-light'/>
                  </Link>
               ))}
            </ul>
         </div>

         <DropNavBar
            showMenu={showMenu}
            setShowMenu={setShowMenu}
         />
      </nav>
   )
}

export default Navbar