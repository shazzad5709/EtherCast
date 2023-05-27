import React, { useEffect } from 'react'
import Navbar from '../components/Utilities/Navbar'
import { HiUserGroup } from 'react-icons/hi'
import { FaUserTie, FaUserPlus } from 'react-icons/fa'
import { MdHowToVote } from 'react-icons/md'
import { RiGovernmentFill } from 'react-icons/ri'
import { NavbarItem } from '../types/interfaces'
import { getServerSession } from 'next-auth'
import axios from 'axios'
import { resolvePtr } from 'dns'

type Props = {}

export default function Test({}: Props) {
  const [code, setCode] = React.useState('')
  const [title, setTitle] = React.useState('')
  const [regDeadline, setRegDeadline] = React.useState(new Date())
  const [voteStart, setVoteStart] = React.useState(new Date())
  const [voteEnd, setVoteEnd] = React.useState(new Date())
  const [officers, setOfficers] = React.useState('')
  const [chairman, setChairman] = React.useState('')
  const [electionCode, setElectionCode] = React.useState('')
  const [org_name, setOrgName] = React.useState('')

  useEffect(() => {
    const getElection = async () => {
      const res = await axios.get('/api/getElection')
      // console.log(res.data._election)
      setCode(res.data._election.electionCode)
      setTitle(res.data._election.electionName)
      setRegDeadline(new Date(parseInt(res.data._election.regDeadlineDate)))
      setVoteStart(new Date(parseInt(res.data._election.voteStartDate)))
      setVoteEnd(new Date(parseInt(res.data._election.voteEndDate)))
      // setOfficers(res.data.officers)
      setChairman(res.data._election.chairman)
      const response = await axios.get('/api/data/Chairman/chairman');
      console.log(response.data)
      console.log(response.data.name)
      setElectionCode(response.data.electionId)

      // setChairman(res.data.name)
      setOrgName(response.data.org_name)
    }
    getElection()
  }, [])

  
  
  return (
    <div className='flex flex-col h-screen items-center justify-center'>
      <p>Org_name: {org_name}</p>
      <p>Title: {title}</p>
      <p>RegDead: {regDeadline.toLocaleString()}</p>
      <p>VS: {voteStart.toLocaleString()}</p>
      <p>VE: {voteEnd.toLocaleString()}</p>
      {/* <p>Officers: {code}</p> */}
      {/* <p>Chairman: {chairman}</p> */}
    </div>
  )
}
