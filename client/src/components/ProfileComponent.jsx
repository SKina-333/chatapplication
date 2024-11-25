import React from 'react'

export default function ProfileComponent({onClick, name}) {
  return (
    <div onClick={onClick} className='border-b-2 border-solid border-gray-200 p-5 hover:bg-slate-200 transition'>
        {name}
    </div>
  )
}
