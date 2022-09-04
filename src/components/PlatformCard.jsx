import Link from 'next/link';
import React from 'react'

const PlatformCard = ({ title, password, id, email }) => {
  return (
    <div className='p-3 max-w-lg border-l border-b mb-3 border-gray-600 text-md '>
      <p>
        <span className='font-bold'>Title: </span>
          {title}
      </p>
      <p>
        <span className='font-bold'>Email: </span>
          {email}
      </p>
      <p>
        <span className='font-bold'>Password: </span>
          {password}
      </p>
      <Link href={`/dashboard/${id}`}>
        <button className='mt-2 px-2 py-1 bg-sky-300 rounded-sm'>More info...</button>
      </Link>
    </div>
  )
}

export default PlatformCard;