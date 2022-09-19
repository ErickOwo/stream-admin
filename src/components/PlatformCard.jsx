import Link from 'next/link';
import React from 'react'

const PlatformCard = ({ title, password, id, email, type }) => {
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
      <p>
      <span className='font-bold'>Type: </span>
          {
            type == 0 ? 'Disney+' :
            type == 1 ? 'HBO MAX' :
            type == 2 ? 'Prime Video' :
            type == 3 ? 'Paramount+' :
            type == 4 ? 'Star+' :
             'Neflix' 
          }
      </p>
      <Link href={`/dashboard/platforms/${id}`}>
        <button className='mt-2 px-2 py-1 bg-sky-300 rounded-sm'>More info...</button>
      </Link>
    </div>
  )
}

export default PlatformCard;