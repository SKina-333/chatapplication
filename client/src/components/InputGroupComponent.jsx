import React from 'react'

export default function InputGroupComponent({inputName, type, placeholder, value, labelName, onChange}) {
  return (
    <div className="relative">
        <label
          htmlFor={inputName}
          className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
        >
          {labelName}
        </label>
        <input
          id={inputName}
          name={inputName}
          type={type}
          placeholder={placeholder}
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm/6"
          value={value}
          onChange={onChange}
        />
      </div>
  )
}

  