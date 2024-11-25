import React from 'react'

export default function UserContactComponent({name,Key}) {
  return (
    <div key={Key} className="shadow-md p-5 rounded-xl bg-slate-100">{name}</div>
  )
}
