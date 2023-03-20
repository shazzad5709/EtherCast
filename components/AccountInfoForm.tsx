import React from 'react'
import { BiUser } from 'react-icons/bi'
import { MdMailOutline, MdOutlinePassword } from 'react-icons/md'

type Props = {
  username: string
  email: string
  password: string
  confirmPassword: string
  updateFields: (fields: Partial<Props>) => void
}

function AccountInfoForm({ username, email, password, confirmPassword, updateFields }: Props) {
  return (
    <>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <BiUser className='text-gray-400 m-2' />
          <input required className='bg-gray-100 flex-1 outline-none' type="text" name='username' placeholder='username' value={username} onChange={e => updateFields({username: e.target.value})} />
      </div>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <MdMailOutline className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="email" name='email' placeholder='email' value={email} onChange={e => updateFields({email: e.target.value})} />
      </div>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <MdOutlinePassword className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="password" name='password' placeholder='password' value={password} onChange={e => updateFields({password: e.target.value})} />
      </div>
      <div className='bg-gray-100 rounded-lg w-64 p-2 flex items-center space-x-1 mb-4'>
        <MdOutlinePassword className='text-gray-400 m-2' />
        <input required className='bg-gray-100 flex-1 outline-none' type="password" name='confirmPassword' placeholder='confirm password' value={confirmPassword} onChange={e => updateFields({confirmPassword: e.target.value})} />
      </div>
    </>
  )
}

export default AccountInfoForm