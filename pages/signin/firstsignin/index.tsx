import axios from 'axios'
import Link from 'next/link'
import React, { FormEvent, useState } from 'react'
import { InfinitySpin } from "react-loader-spinner";

type Props = {}

export default function FirstSignIn({}: Props) {

  const [loading, setLoading] = useState(false)
  
  const handleReset = async (e: FormEvent) => {
    e.preventDefault()

    const newPassword = (document.getElementById('newpassword') as HTMLInputElement).value
    const confirmPassword = (document.getElementById('confirmpassword') as HTMLInputElement)
      .value

    try {
      // const email = await axios.get() // Replace with the user's email
      const response = await axios.post('/api/resetPassword', {
        newPassword,
        confirmPassword,
        
      })

      alert(response.data.message)
    } catch (error) {
      console.error(error)
      alert('An error occurred while updating the password')
    }
  }

  if (loading) {
    return (
      <div className='flex h-screen items-center justify-center text-2xl'>
        <InfinitySpin
          width='200'
          color="#4fa94d"
        />
      </div>
    )
  }

  return (
    <div className='bg-gray-100 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0'>
          <Link
            href='/'
            className='flex justify-center pt-6 items-center text-2xl font-semibold'
          >
            EtherCast
          </Link>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
              Set up new account
            </h1>
            <form className='space-y-4 md:space-y-6' method='POST' onSubmit={handleReset}>
            <div>
                <label
                  htmlFor='newpassword'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  New Password
                </label>
                <input
                  type='password'
                  name='newpassword'
                  id='newpassword'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='confirmpassword'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  name='confirmpassword'
                  id='confirmpassword'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <div className='py-2'>
                <button
                  onClick={handleReset}
                  type='submit'
                  className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Set New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}