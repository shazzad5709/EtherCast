import React, { useEffect, useState } from 'react'
import { InfinitySpin } from "react-loader-spinner";
import { useSession } from 'next-auth/react';
import Unauthenticated from '../../components/PageComponents/Unauthenticated';
import Unauthorized from '../../components/PageComponents/Unauthorized';
import axios from 'axios';
import { useRouter } from 'next/router';
import Voter from '../../components/Dashboard/Voter';
import VoterFirstSignIn from '../../components/Dashboard/VoterFirstSignIn';

type Props = {}

export default function VoterLanding({ }: Props) {
  const { data: session, status } = useSession()
  const [active, setActive] = useState<boolean>(false)
  const router = useRouter()

  const getActiveStatus = async () => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'VOTER') {
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
    if (session?.user?.role === 'VOTER') {
      getActiveStatus()
      console.log(active)
      return (
        <>
          {active ? <Voter /> : <VoterFirstSignIn />}
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