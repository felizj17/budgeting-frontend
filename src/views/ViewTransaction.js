import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function ViewTransaction({ transactions, handleDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [transaction, setTransaction] = useState({})
  const remodelTransaction = transaction => {
    transaction.date = transaction.date.toString().split('T')[0]
    transaction.item_name = transaction.item_name.replace(
      transaction.item_name[0],
      transaction.item_name[0].toUpperCase()
    )
    transaction.category = transaction.category.replace(
      transaction.category[0],
      transaction.category[0].toUpperCase()
    )
  }
  useEffect(() => {
    const current = transactions.filter(transaction => transaction.id.toString(0) === id)[0]
    remodelTransaction(current)
    setTransaction(current)
  }, [transactions, id])
  const handleEdit = () => {
    navigate(`/edit/${transaction.id}`)
  }
  return (
    <div className='transaction-view'>
      <h1>{transaction.item_name} - Amount: ${transaction.amount}</h1>
      <p>
        <i>{transaction.date}</i>
      </p>
      <h2>Category: {transaction.category}</h2>
      <br></br>
      
      <p>
        <span className='from'>From:</span>
        {transaction.from}
      </p>

      <div className='view-btns'>
        <button className='btn edit' onClick={handleEdit}>
          Edit
        </button>
        <button
          className='btn delete'
          onClick={() => handleDelete(transaction.id)}
        >
          Delete
        </button>
      </div>
    </div>
  )
}
