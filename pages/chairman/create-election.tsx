import Link from 'next/link'
import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker'
import DatePicker from './DatePicker'

type Props = {}

export default function CreateElection({}: Props) {
  const [regdeadline, setRegDeadline] = useState<Date | null>(new Date());

  const handleRegDeadlineChange = (value: Date | null) => {
    setRegDeadline(value);
  };

  const handleCreation = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
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
            <h1 className='text-xl font-bold leading-tight tracking-tight md:text-xl'>
              Create a new election
            </h1>
            <form className='space-y-4 md:space-y-6' method='POST' onSubmit={handleCreation}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium'
                >
                  Name of the Election
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Name'
                  required
                //   value={name}
                //   onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='orgname'
                  className='block mb-2 text-sm font-medium'
                >
                  Name of the Organization
                </label>
                <input
                  type='text'
                  name='orgname'
                  id='orgname'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='EtherCast'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='regdeadline'
                  className='block mb-2 text-sm font-medium'
                >
                  Registration Deadline
                </label>
                <input
                  type='date'
                  name='regDeadline'
                  id='regDeadline'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='voteStart'
                  className='block mb-2 text-sm font-medium'
                >
                  Vote Starting Time
                </label>
                <input
                  type='date'
                  name='voteStart'
                  id='voteStart'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <div>
                <label
                  htmlFor='voteEnds'
                  className='block mb-2 text-sm font-medium'
                >
                  Vote Ending Time
                </label>
                <input
                  type='date'
                  name='voteEnds'
                  id='voteEnds'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                />
              </div>
              <button
                type='submit'
                className='w-full text-white bg-green hover:bg-primary-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
              >
                Create Election
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}