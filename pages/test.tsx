import React, { useEffect } from 'react'
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
  const [code, setCode] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [regDeadline, setRegDeadline] = React.useState('')
  const [voteStart, setVoteStart] = React.useState('')
  const [voteEnd, setVoteEnd] = React.useState('')
  const [officers, setOfficers] = React.useState('')
  const [chairman, setChairman] = React.useState('')

  useEffect(() => {
    const getElection = async () => {
      const res = await axios.get('/api/getElection')
      console.log(res.data.election)
      setCode(res.data.electionCode)
      setTitle(res.data.electionName)
      setRegDeadline(res.data.regDeadline)
      setVoteStart(res.data.voteStart)
      setVoteEnd(res.data.voteEnd)
      setOfficers(res.data.officers)
      setChairman(res.data.chairman)
    }
    getElection()
  }, [])
  
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <p>Code: {code}</p>
      <p>Title: {code}</p>
      <p>RegDead: {code}</p>
      <p>VS: {code}</p>
      <p>VE: {code}</p>
      <p>Officers: {code}</p>
      <p>Chairman: {code}</p>
    </div>
  )
}
