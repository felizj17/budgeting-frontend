import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Navbar from './components/Navbar'
import Home from './views/Home'
import NewTransaction from './views/NewTransaction'
import EditTransaction from './views/EditTransaction'
import ViewTransaction from './views/ViewTransaction'
import NotFound from './views/NotFound'
const API = process.env.REACT_APP_API_URL

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const [transactions, setTransactions] = useState([])
  const [total, setTotal] = useState()
  useEffect(() => {
    axios.get(`${API}/transactions`).then(res => {
      setTransactions(res.data)
    })
  }, [location])

  useEffect(() => {
    let total = 0
    transactions.forEach(transaction => (total += +parseFloat(transaction.amount).toFixed(2)))
    setTotal(total)
  }, [transactions])

  const handleDelete = id => {
    axios.delete(`${API}/transactions/${id}/delete`)
    navigate('/')
  }
  return (
    <div className='App'>
      <Navbar total={total} />
      <div className='main'>
        <Routes>
          <Route path='/' element={<Home transactions={transactions} handleDelete={handleDelete} />} />
          <Route
            path='/:id'
            element={
              <ViewTransaction
                transactions={transactions}
                handleDelete={handleDelete}
              />
            }
          />
          <Route path='/new' element={<NewTransaction />} />
          <Route
            path='/edit/:id'
            element={<EditTransaction transactions={transactions} />}
          />
          <Route path='/404' element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
