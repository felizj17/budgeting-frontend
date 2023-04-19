import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import dollarImg from '../img/dollarSign.png'
export default function Navbar({ total }) {
    const navigate = useNavigate()
  return (
    <nav>
      <h1 className='title'>
        <img src={dollarImg} alt='dollarSign' />
        <Link className='home-link' to='/'>
          Budgtr
        </Link>
        <img src={dollarImg} alt='dollarSign' />
      </h1>

      <div className='nav-sub'>
        <h2>Account Total:${total.toFixed(2)}</h2>
        <button id='new-btn' onClick={()=>{navigate('/new')}}>
            New Transaction
        </button>
      </div>
    </nav>
  )
}
