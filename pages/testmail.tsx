import React, { useState } from 'react'
import Navbar from '../components/Utilities/Navbar'
import { FaUserTie } from 'react-icons/fa'
import { MdHowToVote } from 'react-icons/md'
import { RiGovernmentFill } from 'react-icons/ri'
import { NavbarItem } from '../types/interfaces'
import ElectionList from '../components/Utilities/ElectionList'
import { useSession } from 'next-auth/react'

type Props = {}

type ButtonProps = {
  label: string
  isActive: boolean
  onClick: () => void
}

const Button = ({ label, isActive, onClick }: ButtonProps) => {
  const activeClass = isActive ? 'bg-green text-white hover:bg-green-dark' : 'bg-white hover:bg-green-light hover:text-green-dark'

  return (
    <button
      className={`py-2 w-full ${activeClass}`}
      onClick={onClick}
    >
      <p className='text-lg'>{label}</p>
    </button>
  )
}

export default function Elections({ }: Props) {
  const [active, setActive] = useState(true)
  const { data: session, status } = useSession()

  const handleAllClick = () => {
    setActive(true)
  }

  const handleMyClick = () => {
    setActive(false)
  }

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

  const participating = [
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

  const VoterNavItems: NavbarItem[] = [
    {
      id: 1,
      label: 'Profile',
      icon: FaUserTie,
      href: `/profile/${session?.user?.id}`,
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
      <div className='bg-gray-200 flex'>
        {/* <Navbar NavbarItems={VoterNavItems} /> */}
        <div className='w-full h-screen space-y-4'>
          {/* <div className='sticky flex left-0 top-0 right-0 bg-white ml-[-24px] justify-end'>
                <p className='mr-16 py-2 text-2xl font-semibold'>Voter 1</p>
              </div> */}
          <div>
            {/* <div className='sticky left-0 top-0 right-0 flex bg-white mt-2 space-x-2 mr-0 md:mx-6 justify-center'>
              <Button label='All Elections' isActive={active} onClick={handleAllClick} />
              <Button label='Participating' isActive={!active} onClick={handleMyClick} />
            </div> */}
            <div className="bg-white scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-white overflow-y-scroll h-[calc(100vh-48px)] border border-gray-200 shadow-sm lg:mb-12 mr-0 md:m-6">
              {active ? allElection.map((election) => (
                <ElectionList
                  key={election.code}
                  code={election.code}
                  name={election.name}
                  org={election.org}
                  applyDeadline={election.applyDeadline}
                  voteStart={election.voteStart}
                />
              )) : participating.map((election) => (
                <ElectionList
                  key={election.code}
                  code={election.code}
                  name={election.name}
                  org={election.org}
                  applyDeadline={election.applyDeadline}
                  voteStart={election.voteStart}
                  applied
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )



}