import categories from './categories.json'

import {BsBank2} from 'react-icons/bs'
import {BiTransfer, BiCameraMovie} from 'react-icons/bi'
import {RiCommunityFill} from 'react-icons/ri'
import {MdFastfood, MdOutlinePayment, MdOutlineHomeRepairService} from 'react-icons/md'
import {FaHospitalAlt, FaPlaneDeparture} from 'react-icons/fa'
import {AiFillShopping} from 'react-icons/ai'


const mainCategoryIcons = [
   {
      name: 'bank fees',
      icon: BsBank2
   },
   {
      name: 'community',
      icon: RiCommunityFill
   },
   {
      name: 'food and drinks',
      icon: MdFastfood
   },
   {
      name: 'healthcare',
      icon: FaHospitalAlt
   },
   {
      name: 'payment',
      icon: MdOutlinePayment
   },
   {
      name: 'recreation',
      icon: BiCameraMovie
   },
   {
      name: 'service',
      icon: MdOutlineHomeRepairService
   },
   {
      name: 'shops',
      icon: AiFillShopping
   },
   {
      name: 'transfer',
      icon: BiTransfer
   },
   {
      name: 'travel',
      icon: FaPlaneDeparture
   },
]

export default mainCategoryIcons