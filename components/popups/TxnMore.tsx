'use client'

import {useState} from 'react'

import {GrMoreVertical} from 'react-icons/gr'

const TxnMore = () => {
   const [show, setShow] = useState(false)

   return (
      <div>
         <button className='group btn'>
            <GrMoreVertical className='icon text-xl group-hover:text-extra-light'/>
         </button> 
      </div>
   )
}

export default TxnMore