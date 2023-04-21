import Link from 'next/link'
import React, { FormEvent, useCallback, useState } from 'react'
import useResetPass from '../../../hooks/useResetPass'

type Props = {}

export default function ResetPassword({}: Props) {


  const handleProceed = (e: FormEvent) => {
    e.preventDefault()
    next()
  }

  const handleReset = (e: FormEvent) => {
    e.preventDefault()
    alert('wheeee')
  }

  const {
    steps, currentStepIdx, step, next
  } = useResetPass([
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
              Account Recovery
            </h1>
            <form className='space-y-4 md:space-y-6'>
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium'
                >
                  Enter OTP
                </label>
                <input
                  type='number'
                  name='otp'
                  id='otp'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='123456'
                  required
                />
              </div>
              <div className='py-2'>
                <button
                  onClick={handleProceed}
                  type='submit'
                  className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >
                  Proceed
                </button>
                <div className='flex mt-4 items-center justify-between'>
                  <p className='text-sm font-light'>
                    Didn't receive the code?{' '}
                    <Link
                      href='#'
                      className='font-semibold text-primary-600 hover:underline'
                    >
                      Resend code
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    ,
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
              Password Reset
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
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
  ])
    

  return (
    <>
      {step}
    </>
  )
}