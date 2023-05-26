import React from 'react'
import ElectionChairman from '../../components/Dashboard/ElectionChairman'
import { useSession } from 'next-auth/react'
import { InfinitySpin } from 'react-loader-spinner'
import Unauthenticated from '../../components/PageComponents/Unauthenticated'
import Unauthorized from '../../components/PageComponents/Unauthorized'

type Props = {}

export default function Chairman({ }: Props) {
  const { data: session, status } = useSession()
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
    if (session?.user?.role === 'CHAIRMAN') {
      return (
        <ElectionChairman />
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