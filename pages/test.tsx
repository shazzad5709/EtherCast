import React from 'react'
import Navbar from '../components/Utilities/Navbar'
import { HiUserGroup } from 'react-icons/hi'
import { FaUserTie, FaUserPlus } from 'react-icons/fa'
import { MdHowToVote } from 'react-icons/md'
import { RiGovernmentFill } from 'react-icons/ri'
import { NavbarItem } from '../types/interfaces'
import { getServerSession } from 'next-auth'
import axios from 'axios'

type Props = {}

export default function Test({}: Props) {
  const onClick = async () => {
    const res = await axios.post('/api/create-election', {
      name: 'test',
      org: 'test',
      regDeadlineDate: new Date(),
      voteStartDate: new Date(),
      voteEndDate: new Date()
    })
    console.log(res)
  }
  
  return (
    <div className='flex h-screen items-center justify-center'>
      <button className='border border-black px-10 py-2 rounded-full' onClick={onClick}>TEST</button>
    </div>
  )
}
