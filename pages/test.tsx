import React from 'react'
import Navbar from '../components/Utilities/Navbar'
import { HiUserGroup } from 'react-icons/hi'
import { FaUserTie, FaUserPlus } from 'react-icons/fa'
import { MdHowToVote } from 'react-icons/md'
import { RiGovernmentFill } from 'react-icons/ri'
import { NavbarItem } from '../types/interfaces'

type Props = {}

export default function Test({}: Props) {
  const VoterNavItems: NavbarItem[] = [
    {
      id: 1,
      label: 'Profile',
      icon: FaUserTie,
      href: '/profile',
    },
    {
      id: 2,
      label: 'Elections',
      icon: RiGovernmentFill,
      href: '/elections',
    },
    {
      id: 3,
      label: 'Vote',
      icon: MdHowToVote,
      href: '/vote',
    }
  ]

  const CandidateNavItems: NavbarItem[] = [
    {
      id: 1,
      label: 'Profile',
      icon: FaUserTie,
      href: '/profile',
    },
    {
      id: 2,
      label: 'Elections',
      icon: RiGovernmentFill,
      href: '/elections',
    },
    {
      id: 3,
      label: 'Vote',
      icon: MdHowToVote,
      href: '/vote',
    }
  ]

  const AdminNavItems: NavbarItem[] = [
    {
      id: 1,
      label: 'Add Chairman',
      icon: FaUserPlus,
      href: '/add-chairman',
    }
  ]


  // TODO implement a logic to not include
  // New Election option if election already created
  const ChairmanNavItems: NavbarItem[] = [
    {
      id: 1,
      label: 'Profile',
      icon: FaUserTie,
      href: '/profile',
    },
    {
      id: 2,
      label: 'New Election',
      icon: RiGovernmentFill,
      href: '/new-election',
    },
    {
      id: 3,
      label: 'Add Officer',
      icon: FaUserPlus,
      href: '/add-officer',
    }
  ]

  const OfficerNavItems: NavbarItem[] = [
    {
      id: 1,
      label: 'Profile',
      icon: FaUserTie,
      href: '/profile',
    },
    {
      id: 2,
      label: 'Voters',
      icon: HiUserGroup,
      href: '/voters',
    },
    {
      id: 3,
      label: 'Manage Election',
      icon: RiGovernmentFill,
      href: '/manage-election',
    }
  ]

  const GuestNavItems: NavbarItem[] = [
    {
      id: 1,
      label: 'Elections',
      icon: RiGovernmentFill,
      href: '/elections',
    }
  ]

  return (
    <div className='bg-gray-300'>
      <Navbar NavbarItems={VoterNavItems}/>
    </div>
  )
}
