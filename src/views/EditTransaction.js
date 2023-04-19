import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './transactionForm.css'

export default function EditTransaction({transactions}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const [newTransaction, setNewTransaction] = useState({
    id: '',
    item_name: '',
    amount: '',
    date: '',
    from: '',
    category: '',
  })

  useEffect(()=>{
    const selectedTransaction = transactions.filter(transaction=>transaction.id.toString() === id)[0]
    selectedTransaction.date = selectedTransaction.date.split('T')[0]
    console.log(selectedTransaction.date)
    setNewTransaction(selectedTransaction)
  },[id,transactions])
  const submit = e => {
    e.preventDefault()
    try {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/transactions/${id}/edit`,
          newTransaction
        )
        .then(res => console.log(res))
        navigate(`/${newTransaction.id}`)
    } catch {
      setError(true)
    }
  }

  const handleTransactionChange = e => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    })
  }
  const handleSelect=(e)=>{
    console.log(e.target.value)
    setNewTransaction({
        ...newTransaction,
        category:e.target.value
    })
  }

  return (
    <div>
        <h2 className='sub-title'>Edit Current Transaction</h2>
      <form onSubmit={submit}>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          id='date'
          name='date'
          required
          value={newTransaction.date}
          onChange={handleTransactionChange}
        />
        <br></br>
        <label htmlFor='item_name'>Name</label>
        <input
          type='text'
          id='item_name'
          name='item_name'
          value={newTransaction.item_name}
          onChange={handleTransactionChange}
        />
        <br />
        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          id='amount'
          name='amount'
          value={newTransaction.amount}
          onChange={handleTransactionChange}
        />
        <br />
        <label htmlFor='from'>From</label>
        <input
          type='text'
          id='from'
          name='from'
          value={newTransaction.from}
          onChange={handleTransactionChange}
        />
        <br/>
        <select value={newTransaction.category} onChange={handleSelect}>
            <option value='misc'>---Please Select a Category---</option>
            <option value='deposit'>Deposit</option>
            <option value='food'>Food</option>
            <option value='entertainment'>Entertainment</option>
            <option value='grocery'>Grocery</option>
            <option value='travel'>Travel</option>
            <option value='clothing'>Clothing</option>
            <option value='housing'>Rent/Mortgage</option>
            <option value='misc'>Other/Miscellaneous</option>
        </select>
        <section>
          <button className='btn cancel'
            onClick={() => {
              navigate('/')
            }}
          >
            Cancel
          </button>
          <button type='submit' className='btn create' onClick={submit}>
            Edit Transaction
          </button>
        </section>
      </form>
    </div>
  )
}
