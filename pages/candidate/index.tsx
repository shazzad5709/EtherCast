import React, { useState } from 'react'
import Candidate from '../../components/Dashboard/Candidate'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { InfinitySpin } from 'react-loader-spinner'
import VoterFirstSignIn from '../../components/Dashboard/VoterFirstSignIn'
import Unauthenticated from '../../components/PageComponents/Unauthenticated'
import Unauthorized from '../../components/PageComponents/Unauthorized'

type Props = {}

export default function CandidateLanding({}: Props) {
  const { data: session, status } = useSession()
  const [active, setActive] = useState<boolean>(false)

  const getActiveStatus = async () => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'CANDIDATE') {
        await axios.get('./api/data/voter/activeStatus')
          .then((res) => {
            console.log(res.data.msg)
            setActive(Boolean(res.data.msg))
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  if (status === 'loading') {
    return (
      <div className='flex h-screen items-center justify-center text-2xl'>
        <InfinitySpin
          width='200'
          color="#4fa94d"
        />
      </div>
    )
  }

  if (status === 'authenticated') {
    if (session?.user?.role === 'CANDIDATE') {
      getActiveStatus()
      // console.log(active)
      return (
        <>
          {active ? <Candidate /> : <VoterFirstSignIn />}
        </>
      )
    }
    return (
      <Unauthorized path={(session?.user?.role).toLowerCase()} />
    )
  }
  return (
    <Unauthenticated />
  )
}