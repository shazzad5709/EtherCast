import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { InfinitySpin } from 'react-loader-spinner'
import Navbar from "../../components/Utilities/Navbar"
import { FaUserCircle } from 'react-icons/fa'
import { MdOutlineHowToVote } from 'react-icons/md'
import { FiUserPlus } from "react-icons/fi"

type Props = {}

export default function CreateElection({ }: Props) {
  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [regDeadlineDate, setRegDeadlineDate] = useState(new Date())
  const [voteStartDate, setVoteStartDate] = useState(new Date())
  const [voteEndDate, setVoteEndDate] = useState(new Date())
  const [loading, setLoading] = useState(false)
  console.log(Date.now())


  const handleCreateElection = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (regDeadlineDate.getTime() < Date.now()) {
      alert('Voting start date must be in the future')
      return
    }

    if (voteStartDate.getTime() < Date.now()) {
      alert('Voting start date must be in the future')
      return
    }

    if (regDeadlineDate >= voteStartDate) {
      alert('Voting must start after registration closes')
      return
    }

    if (voteStartDate >= voteEndDate) {
      alert('Voting must start be before ending')
      return
    }

    if ((voteStartDate.getTime() - voteEndDate.getTime()) >= (5 * 60 * 1000)) {
      alert('Voting should be open for at least 5 minutes')
      return
    }

    setLoading(true)
    const res = await axios.post('./api/create-election',
      {
        name: name,
        org: org,
        regDeadlineDate: regDeadlineDate,
        voteStartDate: voteStartDate,
        voteEndDate: voteEndDate
      }
    )
      .then((res) => {
        toast.success('Election created successfully')
      })
      .catch((err) => {
        alert(err.response.data)
      })
  }

  const navbarItems = [
    { id: 1, label: 'Profile', icon: FaUserCircle, href: '/profile' },
    { id: 2, label: 'Create Election', icon: MdOutlineHowToVote, href: '/chairman/create-election' },
    { id: 3, label: 'Add Election Officer', icon: FiUserPlus, href: '/addEC' },
    // { id: 4, label: 'View Reports', icon: HiOutlineDocumentReport , href: '/viewReports' },
  ];

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
    <div className="bg-gray-300 flex">
      <Navbar NavbarItems={navbarItems} />
      <div className="w-full justify-center items-center">
        <div className='h-screen'>
          <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0'>
            <div className='w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0'>
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
                      Election Title
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
                      Organization Name
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
      </div>
    </div>

  )
}