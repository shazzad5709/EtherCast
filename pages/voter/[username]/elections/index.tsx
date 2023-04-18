import React from 'react'
import Navbar from '../../../../components/Utilities/Navbar'
import { FaUserTie } from 'react-icons/fa'
import { MdHowToVote } from 'react-icons/md'
import { RiGovernmentFill } from 'react-icons/ri'
import { NavbarItem } from '../../../../types/interfaces'

type Props = {}

export default function Elections({}: Props) {
  const allElection = [
    {
      code: 1,
      name: 'Election 1',
      org: 'Org 1',
      applyDeadline: '2023-05-01',
      voteStart: '2023-05-02',
    },
    {
      code: 2,
      name: 'Election 2',
      org: 'Org 2',
      applyDeadline: '2023-05-01',
      voteStart: '2023-05-02',
    },
    {
      code: 3,
      name: 'Election 3',
      org: 'Org 3',
      applyDeadline: '2023-05-01',
      voteStart: '2023-05-02',
    },
    {
      code: 4,
      name: 'Election 4',
      org: 'Org 4',
      applyDeadline: '2023-05-01',
      voteStart: '2023-05-02',
    },
    {
      code: 5,
      name: 'Election 5',
      org: 'Org 5',
      applyDeadline: '2023-05-01',
      voteStart: '2023-05-02',
    }
  ]

  const participation = [
    {
      code: 1,
      name: 'Election 1',
      org: 'Org 1',
      applyDeadline: '2023-05-01',
      voteStart: '2023-05-02',
    },
    {
      code: 2,
      name: 'Election 2',
      org: 'Org 2',
      applyDeadline: '2023-05-01',
      voteStart: '2023-05-02',
    },
  ]

  const ongoing = [
    {
      code: 3,
      name: 'Election 3',
      result: 'Result 1',
    }
  ]

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
  
  return (
    <div>
      <div className='bg-gray-300 flex'>
        <Navbar NavbarItems={VoterNavItems}/>
        <div className='w-full h-full rounded-lg m-6 bg-white'>
          
        </div>
      </div>
    </div>
  )
}