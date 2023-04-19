import React from 'react'
import i404 from '../img/vecteezy_404-landing-page_6549647.jpg'

export default function NotFound(){
    return (
        <div className='notfound'>
            <h1> That Page Does Not Exist</h1>
        <img className='four04' src={i404} alt='404 Error'/>
            <p>image used:<a href="https://www.vecteezy.com/free-vector/404">404 Vectors by Vecteezy</a> </p>
        </div>
    )
}