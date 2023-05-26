import React, { useEffect, useState } from 'react'
import { InfinitySpin } from "react-loader-spinner";
import { useSession } from 'next-auth/react';
import Unauthenticated from '../../components/PageComponents/Unauthenticated';
import Unauthorized from '../../components/PageComponents/Unauthorized';
import axios from 'axios';
import FirstSignIn from '../signin/firstsignin';
import { useRouter } from 'next/router';
import Voter from '../../components/Dashboard/Voter';

type Props = {}

export default function VoterLanding({ }: Props) {
  const { data: session, status } = useSession()
  const [active, setActive] = useState<boolean>(false)
  const router = useRouter()

  const getActiveStatus = async () => {
    if (status === 'authenticated') {
      if (session?.user?.role === 'VOTER') {
        const res = await axios.get('./api/data/voter/activeStatus')
        setActive(Boolean(res.data.msg))
        if (active === false) {
          router.push('/voter/firstsignin')
        }
      }
    }
  }

  // useEffect(() => {
  //   getActiveStatus()
  // }, [])


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
      return (
        <Voter />
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