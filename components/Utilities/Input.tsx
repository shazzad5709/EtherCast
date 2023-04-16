import React from 'react'

type Props = {
  label: string;
  type: string;
  name: string;
  id: string;
  required?: boolean;
  placeholder?: string;
}

export default function 
({
  label, type, name, id, required
}: Props) {
  return (
    <div>
      <label htmlFor={id} className='block text-sm font-medium'>{label}</label>
      <div className='mt-1'>
        <input 
          type={type}
          name={name}
          id={id}
          required={required}
          className='w-full border border-gray-300 px-3 py-2 rounded-lg shadow-sm focus:outline-none focus:border-green focus:ring-1 focus:ring-green'/>
      </div>
    </div>
  )
}