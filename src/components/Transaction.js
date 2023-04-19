import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Transaction({ transaction, handleDelete }) {
  const navigate = useNavigate()
  const [date, setDate] = useState()
  useEffect(() => {
    // console.log(transaction.date.toString().split('-'))
    const dateArr = transaction.date.toString().split('-')
    dateArr[2] = `${dateArr[2][0]}${dateArr[2][1]}`
    switch (dateArr[1]) {
      case '01':
        setDate(`Jan ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '02':
        setDate(`Feb ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '03':
        setDate(`Mar ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '04':
        setDate(`Apr ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '05':
        setDate(`May ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '06':
        setDate(`Jun ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '07':
        setDate(`Jul ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '08':
        setDate(`Aug ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '09':
        setDate(`Sep ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '10':
        setDate(`Oct ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '11':
        setDate(`Nov ${dateArr[2]}, ${dateArr[0]}`)
        break;
      case '12':
        setDate(`Dec ${dateArr[2]}, ${dateArr[0]}`)
        break;
        default:setDate('No date found')
    }
  }, [transaction])
  // transaction.date
  console.log(transaction)
  return (
    <div className='transaction'>
      <p className='date'>{date}</p>
      <Link className='trans-link' to={`/${transaction.id}`}>
        <p>{`${transaction.item_name}(${transaction.category})`}</p>
      </Link>
      <p className='amount'>$<span className={transaction.amount.toString().includes('-')?'red':'green'}>{transaction.amount}</span></p>
      <div className='btns'>
        <button onClick={()=>{navigate(`/edit/${transaction.id}`)}}>✏️</button>
        <button onClick={()=>handleDelete(transaction.id)}>❌</button>
      </div>
    </div>
  )
}
