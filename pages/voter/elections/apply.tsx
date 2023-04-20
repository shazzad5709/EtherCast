import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = {};

export default function Apply({ }: Props) {
  const router = useRouter()
  const code = router.query.code
  
  return (
    <div className='bg-gray-100 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
        <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
          <Link
            href='/'
            className='flex justify-center pt-6 items-center text-2xl font-semibold'
          >
            EtherCast
          </Link>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-2xl'>
              Apply as a Voter
            </h1>
            <form className='space-y-4 md:space-y-6' action='#'>
              <div className='md:space-y-2'>
                <p className='text-lg'>Election 1 <br /> Org 1 </p>
              </div>
              <div>
                <label
                  htmlFor='code'
                  className='block mb-2 text-sm font-medium'
                >
                  Election Code
                </label>
                <input
                  type='number'
                  name='code'
                  id='code'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='123456'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='employeeId'
                  className='block mb-2 text-sm font-medium'
                >
                  Election Code
                </label>
                <input
                  type='number'
                  name='employeeId'
                  id='employeeId'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='123456'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Password
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Apply
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
