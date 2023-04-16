import React from 'react'
import Button from '../components/Utilities/Button'
import Input from '../components/Utilities/Input'

type Props = {}

export default function Test({}: Props) {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Input label='Email Address' type='email' required name='email' id='email'/>
    </div>
  )
}