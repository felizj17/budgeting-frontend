import React from 'react'
import Transaction from '../components/Transaction'
import './home.css'
export default function Home({ transactions, handleDelete}) {
  return (
    <div className='home'>
        <h2>All Transactions</h2>
      {transactions.map(transaction => (
        <Transaction key={transaction.id} handleDelete={handleDelete} transaction={transaction} />
      ))}
    </div>
  )
}
