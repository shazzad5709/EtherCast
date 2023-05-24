import Link from 'next/link'
import React, { useState } from 'react'

type Props = {}

export default function CreateElection({ }: Props) {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [regDeadlineDate, setRegDeadlineDate] = useState(new Date())
  const [voteStartDate, setVoteStartDate] = useState(new Date())
  const [voteEndDate, setVoteEndDate] = useState(new Date())
  console.log(Date.now())


  const handleCreateElection = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
            <form className='space-y-4 md:space-y-6' method='POST' onSubmit={handleCreateElection}>
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium'
                >
                  Name of Election
                </label>
                <input
                  type='text'
                  name='name'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='org'
                  className='block mb-2 text-sm font-medium'
                >
                  Email
                </label>
                <input
                  type='text'
                  name='org'
                  id='org'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  placeholder='Your Organization Name'
                  required
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor='regDeadlineDate'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Registration Deadline
                </label>
                <div className='flex space-x-2'>
                  <input
                    type='datetime-local'
                    name='regDeadlineDate'
                    id='regDeadlineDate'
                    // placeholder='••••••••'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                    required
                    value={
                      regDeadlineDate.getFullYear().toString() +
                      "-" +
                      (regDeadlineDate.getMonth() + 1).toString().padStart(2, '0') +
                      "-" +
                      regDeadlineDate.getDate().toString().padStart(2, '0') +
                      "T" +
                      regDeadlineDate.getHours().toString().padStart(2, '0') +
                      ":" +
                      regDeadlineDate.getMinutes().toString().padStart(2, '0')

                    }
                    onChange={(e) => setRegDeadlineDate(new Date(e.target.value))}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='voteStartDate'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Voting Opens
                </label>
                <input
                  type='datetime-local'
                  name='voteStartDate'
                  id='voteStartDate'
                  // placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                  value={
                    voteStartDate.getFullYear().toString() +
                    "-" +
                    (voteStartDate.getMonth() + 1).toString().padStart(2, '0') +
                    "-" +
                    voteStartDate.getDate().toString().padStart(2, '0') +
                    "T" +
                    voteStartDate.getHours().toString().padStart(2, '0') +
                    ":" +
                    voteStartDate.getMinutes().toString().padStart(2, '0')
                  }
                  onChange={(e) => setVoteStartDate(new Date(e.target.value))}
                />
              </div>
              <div>
                <label
                  htmlFor='voteEndDate'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Voting Closes
                </label>
                <input
                  type='datetime-local'
                  name='voteEndDate'
                  id='voteEndDate'
                  // placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5'
                  required
                  value={
                    voteEndDate.getFullYear().toString() +
                    "-" +
                    (voteEndDate.getMonth() + 1).toString().padStart(2, '0') +
                    "-" +
                    voteEndDate.getDate().toString().padStart(2, '0') +
                    "T" +
                    voteEndDate.getHours().toString().padStart(2, '0') +
                    ":" +
                    voteEndDate.getMinutes().toString().padStart(2, '0')
                  }
                  onChange={(e) => setVoteEndDate(new Date(e.target.value))}
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