'use client'

import {useState, useEffect, useRef, useCallback} from 'react'
// import {useSession} from 'next-auth/react'
// import {signOut} from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import {gsap} from 'gsap'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'next/router'


import {FaBell,FaListUl,FaChartBar} from 'react-icons/fa'
import {IoSettingsSharp} from 'react-icons/io5'
import {BiMenuAltLeft} from 'react-icons/bi'
import {RiDashboardFill} from 'react-icons/ri'

interface Props {
   showMenu: boolean,
   setShowMenu: Function
}

const NAVLINKS = [
   {
      icon: RiDashboardFill,
      name: 'dashboard',
      href: '/'
   },
   // {
   //    icon: FaBell,
   //    name: 'notifications',
   //    href: '/notifications'
   // },
   {
      icon: FaListUl,
      name: 'bills & transactions',
      href: '/bills-transactions'
   },
   {
      icon: FaChartBar,
      name: 'reports',
      href: '/reports'
   },
   {
      icon: IoSettingsSharp,
      name: 'settings',
      href: '/settings'
   },
]

const DropNavBar = ({showMenu, setShowMenu}: Props) => {

   const {user, logout} = useAuth()
   const router = useRouter()
   const dropNavRef = useRef<HTMLDivElement>(null)
   const dropMenu = useRef<HTMLUListElement>(null)

   useEffect(() => {
      if (showMenu) {
         gsap.fromTo(dropMenu.current, {opacity: 0, scale:0}, {duration: .25, delay: .15, opacity: 1, scale:1, display: 'flex'})
      }
      else {
         gsap.fromTo(dropMenu.current, {opacity: 1, scale:1}, {duration: .25, opacity: 0, scale:0, display: 'none'})
      }
   }, [showMenu])

   const toggleShow = useCallback(() => {
      setShowMenu(!showMenu)
   },[showMenu])

   useEffect(() => {
      const handleClick = (event:any) => {
         if (showMenu) 
            if (dropNavRef.current && !dropNavRef.current.contains(event.target)) {
               toggleShow()
            }
         };

         document.addEventListener('click', handleClick, true);

      return () => {
         document.removeEventListener('click', handleClick, true);
      };
   }, [dropNavRef, showMenu, toggleShow])

   const handleSignOut = async () => {
      await logout()
      router.push('/login')
   }

   return (
      <div className='absolute top-2 right-2 hidden mobile:flex rounded-md flex-col gap-1 items-end bg-[#47504D] p-2 shadow-btn-shadow' ref={dropNavRef}>
         <div className='flex items-center gap-10'>
            {user &&
               <button onClick={handleSignOut} className='border-2 border-extra-light/60 rounded-md group btn'>
                  <p className='text-extra-light'>logout</p>
               </button>
            }
            <button onClick={toggleShow} className='group btn'>
               <BiMenuAltLeft className='icon text-secondary-light text-xl group-hover:text-extra-light'/>
            </button>
         </div>

         <ul className='flex-col opacity-0 scale-0 hidden origin-top-right' ref={dropMenu}>
            {NAVLINKS.map((link, i) => (
               <Link href={link.href} key={i} className='group btn flex hover:bg-secondary-dark items-center gap-4'>
                  <link.icon className='icon text-secondary-light group-hover:text-extra-light'/>
                  <small className='group-hover:text-extra-light text-secondary-light text-[.85rem]'>{link.name}</small>
               </Link>
            ))}
         </ul>
      </div>
   )
}

export default DropNavBar