import React from 'react'
import Navbar from '../components/Utilities/Navbar'
import { HiUserGroup } from 'react-icons/hi'
import { FaUserTie, FaUserPlus } from 'react-icons/fa'
import { MdHowToVote } from 'react-icons/md'
import { RiGovernmentFill } from 'react-icons/ri'
import { NavbarItem } from '../types/interfaces'
import { getServerSession } from 'next-auth'

type Props = {}

export default function Test({}: Props) {
  const session = getServerSession(authOptions)
  console.log(session);
  
  return (
    <></>
  )
}
