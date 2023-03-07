import { Transaction } from 'plaid';
import React, {useState} from 'react'
import ReactPaginate from 'react-paginate';
import TransactionsList from './Transactions';

type Props = {
   transactions: Transaction[],
   totalTransactions: number,
}

const ItemPaginate = ({transactions, totalTransactions}: Props) => {
   const [dispTransactions, setDispTransactions] = useState<Transaction[]>(transactions)
   const [dispTotalTransactions, setDispTotalTransactions] = useState(totalTransactions)

   const [itemOffset, setItemOffset] = useState(0)
   const itemsPerPage = 10
   const endOffset = itemOffset + itemsPerPage
   const currentItems:Transaction[] = dispTransactions.slice(itemOffset, endOffset)
   const pageCount = Math.ceil(dispTotalTransactions / itemsPerPage)

   const handlePageClick = (event:any) => {
      const newOffset = (event.selected * itemsPerPage) % dispTransactions.length
      setItemOffset(newOffset)
   };

   return (
      <>
         <TransactionsList 
            transactions={currentItems} 
            totalTransactions={dispTotalTransactions}
         />
         <ReactPaginate
            breakLabel="..."
            nextLabel="> next"
            onPageChange={handlePageClick}
            pageCount={pageCount}
            previousLabel=" prev <"
            renderOnZeroPageCount={undefined}
            className='pagination-container'
            pageClassName='pagination-item'
            previousClassName='pagination-item'
            nextClassName='pagination-item'
            activeClassName='active-page'
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            breakClassName="pagination-item"
         />
      </>
   )
}

export default ItemPaginate