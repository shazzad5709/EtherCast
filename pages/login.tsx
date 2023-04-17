import React from 'react'
import Button from '../components/Utilities/Button'
import Link from 'next/link'

type Props = {}

export default function login({}: Props) {
  const buttonName = 'Sign in'
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className="bg-grey-100 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-green shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto">
              <div>

              </div>
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="h-10 w-full border-b-2 border-green text-black focus:outline-none focus:border-black"
                      placeholder="username"
                    />
                  </div>

                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="h-10 w-full border-b-2 border-green text-black focus:outline-none focus:border-black"
                      placeholder="Password"
                    />

                  </div>
                  <div className="relative flex flex-col items-center pt-4">
                    <Button label={buttonName} large />
                    <br />
                    <div className='border border-1 w-10 border-black inline-block mb-2'></div>
                    <Link href='/Login/ForgotPass' className='hover:text-green pt-2 text-black'>
                      <p className='text-md'>- Forgot Password? -</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}