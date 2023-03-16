import React from 'react'
import { BiUser } from 'react-icons/bi'
import { MdLockOutline } from 'react-icons/md'

type Props = {
  name: string
  elCode: string
  emId: string
  orgName: string
  updateFields: (fields: Partial<Props>) => void
}

function OrgInfoForm({ name, elCode, emId, orgName, updateFields }: Props) {
  return (
    <>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <BiUser className='text-gray-400 m-2' />
          <input required className='bg-gray-100 flex-1 outline-none' type="text" name='name' placeholder='Full Name' value={name} onChange={e => updateFields({name: e.target.value})} />
      </div>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="number" name='emId' placeholder='Employee ID' value={emId} onChange={e => updateFields({emId: e.target.value})} />
      </div>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <MdLockOutline className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="text" name='orgName' placeholder='Organization' value={orgName} onChange={e => updateFields({orgName: e.target.value})} />
      </div>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <BiUser className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="number" name='elCode' placeholder='Election Code' value={elCode} onChange={e => updateFields({elCode: e.target.value})} />
      </div>
      
    </>
  )
}

export default OrgInfoForm