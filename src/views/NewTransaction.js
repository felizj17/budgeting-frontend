import axios from 'axios'
import { v4 } from 'uuid'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './transactionForm.css'

export default function NewTransaction() {
  const navigate = useNavigate()
  const [error, setError] = useState(false)
  const curDate = [
    new Date().getFullYear(),
    new Date().getMonth().toString().length > 1
      ? new Date().getMonth() + 1
      : `0${new Date().getMonth() + 1}`,
    new Date().getDate().toString().length > 1
      ? new Date().getDate()
      : `0${new Date().getDate()}`,
  ]
  const [newTransaction, setNewTransaction] = useState({
    id: v4(),
    item_name: '',
    amount: '',
    date: curDate.join('-'),
    from: '',
    category: '',
  })
  const submit = e => {
    e.preventDefault()
    try {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/transactions/new`,
          newTransaction
        )
        .then(res => console.log(res))
      navigate('/')
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

  const handleSelect = e => {
    console.log(e.target.value)
    setNewTransaction({
      ...newTransaction,
      category: e.target.value,
    })
  }
  return (
    <div>
        <h2 className='sub-title'>Create a New Transaction</h2>
      <form onSubmit={submit}>
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          id='date'
          name='date'
          value={newTransaction.date}
          onChange={handleTransactionChange}
        />
        <br></br>
        <label htmlFor='item_name'>Name</label>
        <input
          type='text'
          id='item_name'
          name='item_name'
          onChange={handleTransactionChange}
        />
        <br />
        <label htmlFor='amount'>Amount</label>
        <input
          type='number'
          id='amount'
          name='amount'
          onChange={handleTransactionChange}
        />
        <br />
        <label htmlFor='from'>From</label>
        <input
          type='text'
          id='from'
          name='from'
          onChange={handleTransactionChange}
        />
        <br />
        <label htmlFor='category'>Category</label>
        <select id='category' onChange={handleSelect}>
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
            Create Transaction
          </button>
        </section>
      </form>
    </div>
  )
}
