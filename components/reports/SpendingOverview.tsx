'use client'

import {useRef, useState} from 'react'
import BudgetView from './BudgetView'
import CategView from './CategView'

const SpendingOverview = () => {
   const [spendView, setSpendView] = useState('budget')
   const listRef = useRef<HTMLUListElement>(null)

   const toggle = (view:string) => {
      setSpendView(view)
   }

   return (
      <div className='w-full flex flex-col gap-1 overflow-auto'>
         <div className='mx-auto flex justify-center gap-2 w-full'>
            <button 
               onClick={()=>toggle('budget')} 
               className={`group flex-1 btn max-w-[5rem] py-1 px-2 ${spendView === 'budget' ? 'bg-primary-dark shadow-btn-shadow' : 'bg-extra-light'}`}
            >
               <h3 className={`text-xs ${spendView === 'budget' ? 'text-extra-light' : 'text-secondary-dark'} group-hover:text-extra-light transition-all duration-200 ease-in-out`}>
                  budget
               </h3>
            </button>
            <button 
               onClick={()=>toggle('categ')} 
               className={`group flex-1 btn max-w-[5rem] py-1 px-2 ${spendView === 'categ' ? 'bg-primary-dark shadow-btn-shadow' : 'bg-extra-light'}`}
            >
               <h3 className={`text-xs ${spendView === 'categ' ? 'text-extra-light' : 'text-secondary-dark'} group-hover:text-extra-light transition-all duration-200 ease-in-out`}>
                  categories
               </h3>
            </button>
         </div>

         <ul className='flex flex-col justify-center mx-auto w-[75%] sm-width:w-full' ref={listRef}>
            { spendView === 'budget'
               ?
                  <BudgetView/>
               :
                  <CategView/>
            }
         </ul>
      </div>
   )
}

export default SpendingOverview