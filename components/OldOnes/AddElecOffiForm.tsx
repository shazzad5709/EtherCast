import React from 'react'
import { BiUser, BiIdCard } from 'react-icons/bi'
import { FaVoteYea } from 'react-icons/fa'

type Props = {
  firstname: string
  lastname: string
  elCode: string
  email:string
  emType: string
  updateFields: (fields: Partial<Props>) => void
}


function AddElecOffiForm({ firstname ,lastname , elCode, emType , email, updateFields }: Props) {
  
  
  return (
    <>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="text" name='firstname' placeholder='First Name' value={firstname} onChange={e => updateFields({firstname: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="text" name='lastname' placeholder='Last Name' value={lastname} onChange={e => updateFields({lastname: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="email" name='email' placeholder='Email' value={email} onChange={e => updateFields({email: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <BiIdCard className='text-gray-400 m-2' />
      <input required className='bg-gray-100 flex-1 outline-none' type="text" name='emType' placeholder='Employee Type' value={emType} onChange={e => updateFields({emType: e.target.value})} />
    </div>
    <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
      <FaVoteYea className='text-gray-400 m-2' />
      <input required className='bg-gray-100 flex-1 outline-none' type="number" name='elCode' placeholder='Election Code' value={elCode} onChange={e => updateFields({elCode: e.target.value})} />
    </div>
    
  </>
  )
}

export default AddElecOffiForm